import Link from "next/link";

import { JoinButton } from "../Tweets/JoinButton";
import dayjs from "dayjs";
import { MessageCircle, Repeat2, Share } from "lucide-react";

import { Separator } from "@/components/ui/separator";

type EventProps = {
  title: string;
  id: number;
  joins: number;
  joined: boolean;
  fromDate: string;
  toDate: string;
  handle?: string;
  createdAt: Date;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Event({
  title,
  id,
  joins,
  joined,
  fromDate,
  toDate,
  handle,
  // createdAt
}: EventProps) {
  return (
    <>
      <Link
        className="w-full px-4 pt-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: `/event/${id}`,
          query: {
            title,
          },
        }}
      >
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <article className="flex grow flex-row justify-between">
            {/* <p className="m-4 text-2xl">{`${authorName}: ${content}`}</p> */}
            {/* `white-space: pre-wrap` tells html to render \n and \t chracters  */}
            <article className="mt-2 whitespace-pre-wrap">{title}</article>
            {/* <JoinButton
              initialJoinedPeople={joins}
              initialJoined={joined}
              tweetId={id}
              handle={handle}
            /> */}
            {/*
              <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
                <Share size={18} />
              </button>
            </div> */}
          </article>
        </div>
      </Link>
      <Separator />
    </>
  );
}
