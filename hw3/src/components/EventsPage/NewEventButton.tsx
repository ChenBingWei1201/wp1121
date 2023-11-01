"use client";

import { useState } from "react";

import Button from "@mui/material/Button";
import { set } from "zod";

import EventDialog from "./EventDialog";

const NewEventButton = ({userHandle} : {userHandle: string}) => {
  const [openEventDialog, setOpenEventDialog] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        sx={{
          fontSize: "1.1em",
          height: 0.5,
          width: 0.06,
          marginTop: "1.5em",
          marginLeft: "2em",
        }}
        onClick={() => setOpenEventDialog(true)}
      >
        新增
      </Button>
      <EventDialog
        userHandle={userHandle}
        dialogOpen={openEventDialog}
        setDialogOpen={setOpenEventDialog}
      />
    </>
  );
};

export { NewEventButton };
