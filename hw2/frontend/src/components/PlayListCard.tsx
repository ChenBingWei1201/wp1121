import { useState, useRef } from "react";

import "../PlayListCard.css";
import imageURL from "../images/music.jpg";
import CancelIcon from "@mui/icons-material/Cancel";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";

import useSongs from "@/hooks/useSongs";
import { deletePlayList, updatePlayList } from "@/utils/client";

import PlayListTable from "./PlayListTable";
import type { SongProps } from "./Song.tsx";

type CardListProps = {
  id: string;
  name: string;
  description: string;
  songs: SongProps[];
  deleteMode: boolean;
};

export default function ActionAreaCard({
  id,
  name,
  description,
  songs,
  deleteMode,
}: CardListProps) {
  const [openPlayListTable, setOpenPlayListTable] = useState<boolean>(false);
  const { listCardsClosed, setListCardsClosed } = useSongs();
  const { fetchPlayLists } = useSongs();
  const [editingName, setEditingName] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const seeSongList = () => {
    setOpenPlayListTable(true);
    setListCardsClosed(true);
  };

  const handleUpdateName = async () => {
    if (!inputRef.current) return;
    if (!inputRef.current.value) {
      alert("請輸入標題");
      return;
    }
    const newName = inputRef.current.value;
    if (newName !== name) {
      try {
        await updatePlayList(id, { name: newName });
        fetchPlayLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEditingName(false);
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePlayList(id);
      fetchPlayLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  return (
    <>
      {!listCardsClosed && (
        <Card sx={{ maxWidth: 250, minWidth: 250, background: "transparent" }}>
          <CardActionArea sx={{ borderRadius: "12%" }}>
            {deleteMode && (
              <div className="img-wrap flex flex-row-reverse">
                <IconButton color="error" disableRipple>
                  <CancelIcon
                    className="cancel"
                    onClick={() => handleDelete(id)}
                  />
                </IconButton>
              </div>
            )}
            <CardMedia
              component="img"
              height="100"
              image={imageURL}
              alt="owl"
              sx={{ borderRadius: "12%" }}
              onClick={seeSongList}
            />
          </CardActionArea>
          <CardContent
            className="card-content"
            sx={{ padding: 0.5, borderRadius: "12%" }}
            onClick={() => setEditingName(true)}
          >
            <Typography variant="body2" sx={{ color: "#32de84" }}>
              {`${songs.length} ${songs.length > 1 ? "songs" : "song"}`}
            </Typography>
            {editingName ? (
              <ClickAwayListener onClickAway={handleUpdateName}>
                <Input
                  autoFocus
                  defaultValue={name}
                  className="grow"
                  placeholder="Enter a new name for this playlist..."
                  sx={{ fontSize: "0.82rem" }}
                  inputRef={inputRef}
                />
              </ClickAwayListener>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {name}
              </Typography>
            )}
          </CardContent>
        </Card>
      )}
      <PlayListTable
        id={id}
        name={name}
        description={description}
        songs={songs}
        open={openPlayListTable}
        onClose={() => setOpenPlayListTable(false)}
        setListCardsClosed={setListCardsClosed}
      />
    </>
  );
}
