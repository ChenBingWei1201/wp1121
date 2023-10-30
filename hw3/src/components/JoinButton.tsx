"use client";

import { useState } from "react";

import Button from "@mui/material/Button";

const JoinButton = () => {
  const [joined, setJoined] = useState(false);

  return (
    <>
      {!joined ? (
        <Button
          variant="outlined"
          sx={{
            margin: 1.5,
            fontSize: 20,
            height: 0.7,
            marginTop: 5,
            width: 0.08,
          }}
          onClick={() => setJoined(true)}
        >
          我想參加
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="success"
          sx={{
            margin: 1.5,
            fontSize: 20,
            height: 0.7,
            marginTop: 5,
            width: 0.08,
          }}
          onClick={() => setJoined(false)}
        >
          我已參加
        </Button>
      )}
    </>
  );
};

export { JoinButton };
