import { useState } from "react";

import Paper from "@mui/material/Paper";

import SongDialog from "./SongDialog.tsx";

export type SongProps = {
  id: string;
  name: string;
  singer: string;
  link: string;
  playListID: string;
};

export default function Song({
  id,
  name,
  singer,
  link,
  playListID,
}: SongProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button onClick={handleClickOpen} className="text-start">
        <Paper className="flex w-full flex-col p-2" elevation={6}>
          {name}
        </Paper>
      </button>
      <SongDialog
        variant="edit"
        open={open}
        onClose={() => setOpen(false)}
        name={name}
        singer={singer}
        playListId={playListID}
        link={link}
        songId={id}
      />
    </>
  );
}
