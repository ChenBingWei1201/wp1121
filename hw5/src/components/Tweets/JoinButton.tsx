"use client";

import { useState } from "react";
import type { EventHandler, MouseEvent } from "react";

// import Button from "@mui/material/Button";
import useLike from "@/hooks/useLike";
import { cn } from "@/lib/utils";

type JoinButtonProps = {
  initialJoinedPeople: number;
  initialJoined: boolean;
  eventId: number;
  handle?: string;
};
function JoinButton({
  // initialJoinedPeople,
  initialJoined,
  eventId,
  handle,
}: JoinButtonProps) {
  const [joined, setJoined] = useState(initialJoined);
  // const [joinedPeople, setJoinedPeople] = useState(initialJoinedPeople);
  const { likeTweet, unlikeTweet } = useLike();

  const handleClick: EventHandler<MouseEvent> = async (e) => {
    // since the parent node of the button is a Link, when we click on the
    // button, the Link will also be clicked, which will cause the page to
    // navigate to the tweet page, which is not what we want. So we stop the
    // event propagation and prevent the default behavior of the event.
    // e.stopPropagation();
    e.preventDefault();
    if (!handle) return;
    if (joined) {
      await unlikeTweet({
        eventId: eventId,
        userHandle: handle,
      });
      // setJoinedPeople((prev) => prev - 1);
      setJoined(false);
    } else {
      await likeTweet({
        eventId: eventId,
        userHandle: handle,
      });
      // setJoinedPeople((prev) => prev + 1);
      setJoined(true);
    }
  };

  return (
    <>
      {/* {!joined ? (
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
          disabled={loading}
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
          disabled={loading}
        >
          我已參加
        </Button>
      )} */}
      <button
        className={cn(
          "mr-5 mt-16 flex h-20 w-20 flex-wrap justify-center rounded-lg border-2 border-cyan-400 text-center text-2xl",
          joined && "bg-green-400",
        )}
        onClick={handleClick}
        // disabled={loading}
      >
        <span className="m-1.5">{!joined ? "我想參加" : "我已參加"}</span>
      </button>
    </>
  );
}

export { JoinButton };
