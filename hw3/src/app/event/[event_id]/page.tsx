import Link from "next/link";
import { redirect } from "next/navigation";

// import { id_ID } from "@faker-js/faker";
// import dayjs from "dayjs";
import { eq, desc/*, sql*/, and } from "drizzle-orm";
import {
  // MessageCircle,
  // MoreHorizontal,
  // Repeat2,
  // Share,
  ChevronLeft,
} from "lucide-react";

import { JoinButton } from "@/components/Tweets/JoinButton";
import ReplyInput from "@/components/Tweets/ReplyInput";
import Tweet from "@/components/Tweets/Tweet";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { eventsTable, joinsTable, usersTable, tweetsTable } from "@/db/schema";

type EventPageProps = {
  params: {
    // this came from the file name: [event_id].tsx
    event_id: string;
  };
  searchParams: {
    // this came from the query string: ?username=madmaxieee
    username?: string;
    handle?: string;
  };
};

// these two fields are always available in the props object of a page component
export default async function EventPage({
  params: { event_id },
  searchParams: { username, handle },
}: EventPageProps) {
  const event_id_num = parseInt(event_id);
  // console.log(event_id_num);
  const errorRedirect = () => {
    console.log(username, handle);
    const params = new URLSearchParams();
    username && params.set("username", username);
    handle && params.set("handle", handle);
    redirect(`/?${params.toString()}`);
  };

  if (isNaN(event_id_num)) {
    errorRedirect();
  }

  // This is the easiest way to get the event data
  // you can run separate queries for the event data, joins, and joined
  // and then combine them in javascript.
  //
  // This gets things done for now, but it's not the best way to do it
  // relational databases are highly optimized for this kind of thing
  // we should always try to do as much as possible in the database.

  // This piece of code runs the following SQL query on the tweets table:
  // SELECT
  //   id,
  //   content,
  //   user_handle,
  //   created_at
  //   FROM events
  //   WHERE id = {event_id_num};
  const [eventData] = await db
    .select({
      id: eventsTable.id,
      title: eventsTable.title,
      fromDate: eventsTable.fromDate,
      toDate: eventsTable.toDate,
      userHandle: eventsTable.userHandle,
    })
    .from(eventsTable)
    .where(eq(eventsTable.id, event_id_num))
    .execute();

  // Although typescript thinks eventData is not undefined, it is possible
  // that eventData is undefined. This can happen if the event doesn't exist.
  // Thus the destructuring assignment above is not safe. We need to check
  // if eventData is undefined before using it.
  if (!eventData) {
    errorRedirect();
  }

  // This piece of code runs the following SQL query on the tweets table:
  // SELECT
  //  id,
  //  FROM joins
  //  WHERE event_id = {event_id_num};
  // Since we only need the number of joins, we don't actually need to select
  // the id here, we can select a constant 1 instead. Or even better, we can
  // use the count aggregate function to count the number of rows in the table.
  // This is what we do in the next code block in joinsSubquery.
  const joins = await db
    .select({
      id: joinsTable.id,
    })
    .from(joinsTable)
    .where(eq(joinsTable.eventId, event_id_num))
    .execute();

  const numLikes = joins.length;

  const [joined] = await db
    .select({
      id: joinsTable.id,
    })
    .from(joinsTable)
    .where(
      and(
        eq(joinsTable.eventId, event_id_num),
        eq(joinsTable.userHandle, handle ?? ""),
      ),
    )
    .execute();

  const [user] = await db
    .select({
      displayName: usersTable.displayName,
      handle: usersTable.handle,
    })
    .from(usersTable)
    .where(eq(usersTable.handle, eventData.userHandle))
    .execute();

  const event = {
    id: eventData.id,
    title: eventData.title,
    fromDate: eventData.fromDate,
    toDate: eventData.toDate,
    joins: numLikes,
    joined: Boolean(joined),
    handle: user.handle,
  };

  // The following code is almost identical to the code in src/app/page.tsx
  // read the comments there for more info.
  // const joinsSubquery = db.$with("joins_count").as(
  //   db
  //     .select({
  //       eventId: joinsTable.eventId,
  //       joins: sql<number | null>`count(*)`.mapWith(Number).as("joins"),
  //     })
  //     .from(joinsTable)
  //     .groupBy(joinsTable.eventId),
  // );

  // const joinedSubquery = db.$with("joined").as(
  //   db
  //     .select({
  //       eventId: joinsTable.eventId,
  //       joined: sql<number>`1`.mapWith(Boolean).as("joined"),
  //     })
  //     .from(joinsTable)
  //     .where(eq(joinsTable.userHandle, handle ?? "")),
  // );

  // const replies = await db.query.tweetsTable.findMany({
  //   // where: eq(tweetsTable.replyToEventId, event_id_num),
  //   columns: {
  //     id: true,
  //     content: true,
  //     userHandle: true,
  //     replyToEventId: true,
  //     createdAt: true,
  //   },
  //   orderBy: [desc(tweetsTable.createdAt)],
  // });
  // console.log(tweetsTable.replyToEventId);

  const replies = await db
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      username: usersTable.displayName,
      handle: usersTable.handle,
      createdAt: tweetsTable.createdAt,
      replyEventId: eventsTable.id,
    })
    .from(tweetsTable)
    .where(eq(tweetsTable.replyToEventId, event_id_num))
    .orderBy(desc(tweetsTable.createdAt))
    .innerJoin(usersTable, eq(tweetsTable.userHandle, usersTable.handle))
    .innerJoin(eventsTable, eq(tweetsTable.replyToEventId, eventsTable.id))
    .execute();
  // console.log(replies);
  // const [joined, setJoined] = useState(false);

  return (
    <>
      <div className="flex h-screen w-full flex-col overflow-scroll pt-2">
        <div className="flex flex-row">
          <div className="mb-2 flex items-center gap-8 px-4">
            <Link href={{ pathname: "/", query: { username, handle } }}>
              <ChevronLeft size={50} />
            </Link>
            {/* <h1 className="text-xl font-bold">Tweet</h1> */}
          </div>
          <div className="flex w-full flex-col px-4 pt-3">
            {/* <div className="flex justify-between">
            <div className="flex w-full gap-3"> */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* <img
                src={getAvatar(event.title)}
                alt="user avatar"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-bold">{event.title ?? "..."}</p>
                <p className="font-normal text-gray-500">
                  @{event.fromDate ?? "..."}
                </p>
              </div>
            </div>
            <button className="h-fit rounded-full p-2.5 text-gray-400 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <MoreHorizontal size={16} />
            </button>
          </div> */}
            <p className="contain-center my-3 flex h-16 items-center justify-between whitespace-pre-wrap rounded-xl bg-slate-200 text-3xl">
              {`  ${event.title}`}
              <span className="text-2xl">{`${event.joins}人參加   `}</span>
            </p>
            {/* <time className="my-4 block text-sm text-gray-500"> */}
            {/* dayjs is a great library for working with dates in javascript */}
            {/* we use it to format the date in a nice way */}
            {/* {dayjs(event.createdAt).format("h:mm A · D MMM YYYY")}
          </time> */}
            {/* <Separator /> */}
            <div className="my-3 flex h-16 items-center justify-between gap-4 rounded-xl bg-slate-200">
              <p className="whitespace-pre-wrap text-2xl">
                {`   From ${event.fromDate} to ${event.toDate}`}
              </p>
              {/* <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <MessageCircle size={20} className="-scale-x-100" />
            </button>
            <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <Repeat2 size={22} />
            </button>
            <LikeButton
              fromDate={fromDate}
              initialLikes={event.joins}
              initialLiked={event.joined}
              eventId={event.id}
            />
            <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <Share size={18} />
            </button> */}
            </div>
            {/* <Separator /> */}
          </div>
          <JoinButton
            initialJoinedPeople={event.joins}
            initialJoined={event.joined}
            eventId={event.id}
            handle={handle}
          />
          {/* {!joined ? <Button>我想參加</Button> : <Button>我已參加</Button>} */}
        </div>

        <ReplyInput replyToEventId={event.id} initialJoined={event.joined} />
        <Separator />
        {replies.map((reply) => (
          <Tweet
            key={reply.id}
            id={reply.id}
            username={reply.username}
            handle={reply.handle}
            authorName={reply.username}
            authorHandle={reply.handle}
            content={reply.content}
            // joins={reply.joins}
            // joined={reply.joined}
            createdAt={reply.createdAt!}
          />
        ))}
      </div>
    </>
  );
}
