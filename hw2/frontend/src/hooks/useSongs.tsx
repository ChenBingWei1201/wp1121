import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { SongProps } from "../components/Song.tsx";
import type {
  GetSongsResponse,
  GetPlayListsResponse,
} from "@lib/shared_types.ts";

import { getSongs, getPlayLists } from "@/utils/client.ts";

type PlayListProps = {
  id: string;
  name: string;
  description: string;
  songs: SongProps[];
};

type SongContextType = {
  rawSongs: GetSongsResponse;
  listCardsClosed: boolean;
  setListCardsClosed: React.Dispatch<React.SetStateAction<boolean>>;
  playlists: PlayListProps[];
  fetchPlayLists: () => Promise<void>;
  fetchSongs: () => Promise<void>;
};

// context is a way to share data between components without having to pass props down the component tree
const SongContext = createContext<SongContextType>({
  rawSongs: [],
  listCardsClosed: false,
  setListCardsClosed: () => {},
  playlists: [],
  fetchPlayLists: async () => {},
  fetchSongs: async () => {},
});

type SongProviderProps = {
  children: React.ReactNode;
};

// all data fetching and processing is done here, the rest of the app just consumes the data exposed by this provider
// when we run fetchPlayLists or fetchSongs, we update the state of the provider, which causes the rest of the app to re-render accordingly
export function SongProvider({ children }: SongProviderProps) {
  const [rawPlayLists, setRawPlayLists] = useState<GetPlayListsResponse>([]);
  const [rawSongs, setRawSongs] = useState<GetSongsResponse>([]);
  const [listCardsClosed, setListCardsClosed] = useState(false);

  const fetchPlayLists = useCallback(async () => {
    try {
      const { data } = await getPlayLists();
      setRawPlayLists(data);
    } catch (error) {
      alert("Error: failed to fetch playlists");
    }
  }, []);

  const fetchSongs = useCallback(async () => {
    try {
      const { data } = await getSongs();
      setRawSongs(data);
    } catch (error) {
      alert("Error: failed to fetch songs");
    }
  }, []);

  const playlists = useMemo(() => {
    // you can do functional-ish programming in JS too
    const playListMap = rawPlayLists.reduce(
      (acc, list) => {
        acc[list.id] = { ...list, songs: [] };
        return acc;
      },
      {} as Record<string, PlayListProps>,
    );
    // or you can do for loops
    for (const song of rawSongs) {
      const playlist = playListMap[song.playListID];
      if (!playlist) {
        continue;
      }
      playListMap[song.playListID].songs.push({
        ...song,
        playListID: song.playListID,
      });
    }
    return Object.values(playListMap);
  }, [rawSongs, rawPlayLists]);

  return (
    <SongContext.Provider
      value={{
        rawSongs,
        listCardsClosed,
        setListCardsClosed,
        playlists,
        fetchPlayLists,
        fetchSongs,
      }}
    >
      {children}
    </SongContext.Provider>
  );
}

// this is a custom hook, the name must start with "use"
export default function useSongs() {
  return useContext(SongContext);
}
