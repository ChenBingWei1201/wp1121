import { useState } from "react";

import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import useSongs from "@/hooks/useSongs.tsx";
import {
  createSong,
  /*, deleteSong*/
  updateSong,
} from "@/utils/client.ts";

// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types
type NewSongDialogProps = {
  variant: "new";
  open: boolean;
  onClose: () => void;
  playListId: string;
};

type EditSongDialogProps = {
  variant: "edit";
  open: boolean;
  onClose: () => void;
  playListId: string;
  songId: string;
  name: string;
  singer: string;
  link: string;
};

type SongDialogProps = NewSongDialogProps | EditSongDialogProps;

export default function SongDialog(props: SongDialogProps) {
  const { variant, open, onClose, playListId } = props;
  const name = variant === "edit" ? props.name : "";
  const singer = variant === "edit" ? props.singer : "";
  const link = variant === "edit" ? props.link : "";

  const [editingName, setEditingName] = useState(variant === "new");
  const [editingSinger, setEditingSinger] = useState(variant === "new");
  const [editingLink, setEditingLink] = useState(variant === "new");

  // using a state variable to store the value of the input, and update it on change is another way to get the value of a input
  // however, this method is not recommended for large forms, as it will cause a re-render on every change
  // you can read more about it here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  const [newName, setNewName] = useState(name);
  const [newSinger, setNewSinger] = useState(singer);
  const [newLink, setNewLink] = useState(link);
  const [newPlayListId, setNewPlayListId] = useState(playListId);

  const { playlists, fetchSongs } = useSongs();

  const handleClose = () => {
    onClose();
    // if (variant === "edit") {
    //   console.log(name); // original name, not the new one!
    //   setNewName(name);
    //   setNewSinger(singer);
    //   setNewLink(link);
    //   setNewPlayListId(newPlayListId); // why not new?
    // }
  };

  const handleSave = async () => {
    try {
      if (variant === "new") {
        await createSong({
          name: newName,
          singer: newSinger,
          link: newLink,
          playListID: newPlayListId,
        });
      } else {
        if (
          // 完全一樣
          newName === name &&
          newSinger === singer &&
          newLink === link &&
          newPlayListId === playListId
        ) {
          return; // 不浪費時間傳去後端
        }
        // typescript is smart enough to know that if variant is not "new", then it must be "edit"
        // therefore props.cardId is a valid value
        await updateSong(props.songId, {
          // 不是new => 是edit => update
          name: newName,
          singer: newSinger,
          link: newLink,
          playListID: newPlayListId,
        });
      }
      fetchSongs();
    } catch (error) {
      alert("Error: Failed to save card");
    } finally {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="flex gap-4">
        {editingName ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingName(false);
              }
            }}
          >
            <Input
              autoFocus
              defaultValue={name}
              onChange={(e) => setNewName(e.target.value)} // the new one
              className="grow"
              placeholder="Enter a name for this song..."
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newName}</Typography>
          </button>
        )}
        <Select
          value={newPlayListId}
          onChange={(e) => setNewPlayListId(e.target.value)}
        >
          {playlists.map((playlist) => (
            <MenuItem value={playlist.id} key={playlist.id}>
              {playlist.name}
            </MenuItem>
          ))}
        </Select>
      </DialogTitle>
      <DialogTitle className="flex gap-4">
        {editingSinger ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingSinger(false);
              }
            }}
          >
            <Input
              autoFocus
              defaultValue={singer}
              onChange={(e) => setNewSinger(e.target.value)}
              className="grow"
              placeholder="Enter a singer for this song..."
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingSinger(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newSinger}</Typography>
          </button>
        )}
      </DialogTitle>
      <DialogTitle className="flex gap-4">
        {editingLink ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingLink(false);
              }
            }}
          >
            <Input
              autoFocus
              defaultValue={link}
              onChange={(e) => setNewLink(e.target.value)}
              className="grow"
              placeholder="Enter a link for this song..."
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingLink(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newLink}</Typography>
          </button>
        )}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleSave}>save</Button>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog>
  );
}
