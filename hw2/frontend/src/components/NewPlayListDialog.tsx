import { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useSongs from "@/hooks/useSongs";
import { createPlayList } from "@/utils/client";

type NewPlayListDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({
  open,
  onClose,
}: NewPlayListDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const { fetchPlayLists } = useSongs();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddList = async () => {
    if (!name) {
      alert("請輸入標題");
      return;
    } else if (!description) {
      alert("請輸入內容");
      return;
    } else
      try {
        await createPlayList({ name: name, description: description });
        fetchPlayLists();
      } catch (error) {
        alert("Error: Failed to create list");
      } finally {
        onClose();
      }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a list</DialogTitle>
      <DialogContent>
        <TextField
          required
          id="outlined-required"
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          // inputRef={textfieldRef}
          label="List Name"
          variant="outlined"
          sx={{ mt: 2 }}
          autoFocus
        />
      </DialogContent>
      <DialogContent>
        <textarea
          className="resize rounded-md bg-white/0 p-3"
          autoFocus
          placeholder="Add a more detailed description..."
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
