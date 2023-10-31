"use client";

import { useState } from "react";
import type { EventHandler, MouseEvent } from "react";

import Button from "@mui/material/Button";

import useLike from "@/hooks/useLike";
import { cn } from "@/lib/utils";

type JoinButtonProps = {
  initialJoinedPeople: number;
  initialJoined?: boolean;
  tweetId: number;
  handle?: string;
};
const JoinButton = ({
  initialJoinedPeople,
  initialJoined,
  tweetId,
  handle,
}: JoinButtonProps) => {
  const [joined, setJoined] = useState(initialJoined);
  const [joinedPeople, setJoinedPeople] = useState(initialJoinedPeople);
  const { likeTweet, unlikeTweet, loading } = useLike();

  const handleClick: EventHandler<MouseEvent> = async (e) => {
    // since the parent node of the button is a Link, when we click on the
    // button, the Link will also be clicked, which will cause the page to
    // navigate to the tweet page, which is not what we want. So we stop the
    // event propagation and prevent the default behavior of the event.
    e.stopPropagation();
    e.preventDefault();
    if (!handle) return;
    if (joined) {
      await unlikeTweet({
        tweetId,
        userHandle: handle,
      });
      setJoinedPeople((prev) => prev - 1);
      setJoined(false);
    } else {
      await likeTweet({
        tweetId,
        userHandle: handle,
      });
      setJoinedPeople((prev) => prev + 1);
      setJoined(true);
    }
  };

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
