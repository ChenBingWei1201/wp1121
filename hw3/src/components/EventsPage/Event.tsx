import Link from "next/link";

// import { JoinButton } from "../Tweets/JoinButton";
import dayjs from "dayjs";
import { MessageCircle, Repeat2, Share } from "lucide-react";
import { Check } from "lucide-react";

import { Separator } from "@/components/ui/separator";

type EventProps = {
  title: string;
  id: number;
  joins: number;
  joined: boolean;
  fromDate: string;
  toDate: string;
  handle?: string;
  username?: string;
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
  username, // createdAt
}: EventProps) {
  return (
    <>
      <Link
        className="w-full px-4 py-3 transition-colors hover:bg-gray-50"
        href={{
          pathname: `/event/${id}`,
          query: {
            username,
            handle,
          },
        }}
      >
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <article className="flex grow flex-row justify-between h-14"> */}
          {/* <p className="m-4 text-2xl">{`${authorName}: ${content}`}</p> */}
          {/* `white-space: pre-wrap` tells html to render \n and \t chracters  */}
          <div className="flex h-14 grow flex-row justify-between whitespace-pre-wrap text-3xl">
            <span className="self-center">{`   ${title}`}</span>
            <div className="mt-0 flex flex-row">
              <span className="self-center mr-5">
                {joined && <Check width="80" color="green" size={55} />}
              </span>
              <span className="self-center mr-3">
                {joins > 0 && `${joins}人參加`}
              </span>
            </div>
          </div>
          {/*
              <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
                <Share size={18} />
              </button>
            </div> */}
          {/* </article> */}
        </div>
      </Link>
      <Separator />
    </>
  );
}
