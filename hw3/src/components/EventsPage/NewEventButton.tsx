"use client";

import { useState } from "react";

import Button from "@mui/material/Button";
import { set } from "zod";

import EventDialog from "./EventDialog";

const NewEventButton = () => {
  const [openEventDialog, setOpenEventDialog] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        sx={{ fontSize: "1.1em", height: 0.5, marginTop: "1.5em" }}
        onClick={() => setOpenEventDialog(true)}
      >
        新增
      </Button>
      <EventDialog
        dialogOpen={openEventDialog}
        setDialogOpen={setOpenEventDialog}
      />
    </>
  );
};

export { NewEventButton };
