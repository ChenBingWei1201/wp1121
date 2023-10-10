import type {
  CreateSongPayload,
  CreateSongResponse,
  CreatePlayListPayload,
  CreatePlayListResponse,
  GetSongsResponse,
  GetPlayListsResponse,
  UpdateSongPayload,
  UpdateSongResponse,
  DeleteSongResponse,
  DeletePlayListResponse,
  UpdatePlayListPayload,
  UpdatePlayListResponse,
} from "@lib/shared_types";
import axios from "axios";

import { env } from "./env";

const client = axios.create({
  baseURL: env.VITE_API_URL,
});

export function getPlayLists() {
  return client.get<GetPlayListsResponse>("/playlists");
}

export function getSongs() {
  return client.get<GetSongsResponse>("/songs");
}

export function createPlayList(input: CreatePlayListPayload) {
  return client.post<CreatePlayListResponse>("/playlists", input);
}

export function createSong(input: CreateSongPayload) {
  return client.post<CreateSongResponse>("/songs", input);
}

export function updateSong(id: string, input: UpdateSongPayload) {
  return client.put<UpdateSongResponse>(`/songs/${id}`, input);
}

export function updatePlayList(id: string, input: UpdatePlayListPayload) {
  return client.put<UpdatePlayListResponse>(`/playlists/${id}`, input);
}

export function deleteSong(id: string) {
  return client.delete<DeleteSongResponse>(`/songs/${id}`);
}

export function deletePlayList(id: string) {
  return client.delete<DeletePlayListResponse>(`/playlists/${id}`);
}
