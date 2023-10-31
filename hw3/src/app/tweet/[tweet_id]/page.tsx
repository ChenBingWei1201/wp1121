import Link from "next/link";
import { redirect } from "next/navigation";

import dayjs from "dayjs";
import { eq, desc, sql, and } from "drizzle-orm";
import {
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share,
  ChevronLeft,
} from "lucide-react";

import { JoinButton } from "@/components/Tweets/JoinButton";
// import LikeButton from "@/components/LikeButton";
import ReplyInput from "@/components/Tweets/ReplyInput";
import Tweet from "@/components/Tweets/Tweet";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { likesTable, tweetsTable, usersTable } from "@/db/schema";

// import { getAvatar } from "@/lib/utils";

type TweetPageProps = {
  params: {
    // this came from the file name: [tweet_id].tsx
    tweet_id: string;
  };
  searchParams: {
    // this came from the query string: ?username=madmaxieee
    username?: string;
    handle?: string;
  };
};

// these two fields are always available in the props object of a page component
export default async function TweetPage({
  params: { tweet_id },
  searchParams: { username, handle },
}: TweetPageProps) {
  const tweet_id_num = parseInt(tweet_id);

  const errorRedirect = () => {
    const params = new URLSearchParams();
    username && params.set("username", username);
    handle && params.set("handle", handle);
    redirect(`/?${params.toString()}`);
  };

  if (isNaN(tweet_id_num)) {
    errorRedirect();
  }

  // This is the easiest way to get the tweet data
  // you can run separate queries for the tweet data, likes, and liked
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
  //   FROM tweets
  //   WHERE id = {tweet_id_num};
  const [tweetData] = await db
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      userHandle: tweetsTable.userHandle,
      createdAt: tweetsTable.createdAt,
    })
    .from(tweetsTable)
    .where(eq(tweetsTable.id, tweet_id_num))
    .execute();

  // Although typescript thinks tweetData is not undefined, it is possible
  // that tweetData is undefined. This can happen if the tweet doesn't exist.
  // Thus the destructuring assignment above is not safe. We need to check
  // if tweetData is undefined before using it.
  if (!tweetData) {
    errorRedirect();
  }

  // This piece of code runs the following SQL query on the tweets table:
  // SELECT
  //  id,
  //  FROM likes
  //  WHERE tweet_id = {tweet_id_num};
  // Since we only need the number of likes, we don't actually need to select
  // the id here, we can select a constant 1 instead. Or even better, we can
  // use the count aggregate function to count the number of rows in the table.
  // This is what we do in the next code block in likesSubquery.
  const likes = await db
    .select({
      id: likesTable.id,
    })
    .from(likesTable)
    .where(eq(likesTable.tweetId, tweet_id_num))
    .execute();

  const numLikes = likes.length;

  const [liked] = await db
    .select({
      id: likesTable.id,
    })
    .from(likesTable)
    .where(
      and(
        eq(likesTable.tweetId, tweet_id_num),
        eq(likesTable.userHandle, handle ?? ""),
      ),
    )
    .execute();

  const [user] = await db
    .select({
      displayName: usersTable.displayName,
      handle: usersTable.handle,
    })
    .from(usersTable)
    .where(eq(usersTable.handle, tweetData.userHandle))
    .execute();

  const tweet = {
    id: tweetData.id,
    content: tweetData.content,
    username: user.displayName,
    handle: user.handle,
    likes: numLikes,
    createdAt: tweetData.createdAt,
    liked: Boolean(liked),
  };

  // The following code is almost identical to the code in src/app/page.tsx
  // read the comments there for more info.
  const likesSubquery = db.$with("likes_count").as(
    db
      .select({
        tweetId: likesTable.tweetId,
        likes: sql<number | null>`count(*)`.mapWith(Number).as("likes"),
      })
      .from(likesTable)
      .groupBy(likesTable.tweetId),
  );

  const likedSubquery = db.$with("liked").as(
    db
      .select({
        tweetId: likesTable.tweetId,
        liked: sql<number>`1`.mapWith(Boolean).as("liked"),
      })
      .from(likesTable)
      .where(eq(likesTable.userHandle, handle ?? "")),
  );

  const replies = await db
    .with(likesSubquery, likedSubquery)
    .select({
      id: tweetsTable.id,
      content: tweetsTable.content,
      username: usersTable.displayName,
      handle: usersTable.handle,
      likes: likesSubquery.likes,
      createdAt: tweetsTable.createdAt,
      liked: likedSubquery.liked,
    })
    .from(tweetsTable)
    .where(eq(tweetsTable.replyToTweetId, tweet_id_num))
    .orderBy(desc(tweetsTable.createdAt))
    .innerJoin(usersTable, eq(tweetsTable.userHandle, usersTable.handle))
    .leftJoin(likesSubquery, eq(tweetsTable.id, likesSubquery.tweetId))
    .leftJoin(likedSubquery, eq(tweetsTable.id, likedSubquery.tweetId))
    .execute();

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
                src={getAvatar(tweet.username)}
                alt="user avatar"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="font-bold">{tweet.username ?? "..."}</p>
                <p className="font-normal text-gray-500">
                  @{tweet.handle ?? "..."}
                </p>
              </div>
            </div>
            <button className="h-fit rounded-full p-2.5 text-gray-400 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <MoreHorizontal size={16} />
            </button>
          </div> */}
            <p className="contain-center my-3 flex h-16 items-center justify-between whitespace-pre-wrap rounded-xl bg-slate-200 text-3xl">
              {`  ${tweet.content}`}
              <span className="text-2xl">{`4人參加   `}</span>
            </p>
            {/* <time className="my-4 block text-sm text-gray-500"> */}
            {/* dayjs is a great library for working with dates in javascript */}
            {/* we use it to format the date in a nice way */}
            {/* {dayjs(tweet.createdAt).format("h:mm A · D MMM YYYY")}
          </time> */}
            {/* <Separator /> */}
            <div className="my-3 flex h-16 items-center justify-between gap-4 rounded-xl bg-slate-200">
              <p className="whitespace-pre-wrap text-2xl">
                {`   From 2023-10-30 to 2023-11-30`}
              </p>
              {/* <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <MessageCircle size={20} className="-scale-x-100" />
            </button>
            <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <Repeat2 size={22} />
            </button>
            <LikeButton
              handle={handle}
              initialLikes={tweet.likes}
              initialLiked={tweet.liked}
              tweetId={tweet.id}
            />
            <button className="rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <Share size={18} />
            </button> */}
            </div>
            {/* <Separator /> */}
          </div>
          <JoinButton
            handle={handle}
            initialJoinedPeople={tweet.likes}
            initialJoined={tweet.liked}
            tweetId={tweet.id}
          />
          {/* {!joined ? <Button>我想參加</Button> : <Button>我已參加</Button>} */}
        </div>

        <ReplyInput replyToTweetId={tweet.id} replyToHandle={tweet.handle} />
        <Separator />
        {replies.map((reply) => (
          <Tweet
            key={reply.id}
            id={reply.id}
            username={username}
            handle={handle}
            authorName={reply.username}
            authorHandle={reply.handle}
            content={reply.content}
            likes={reply.likes}
            liked={reply.liked}
            createdAt={reply.createdAt!}
          />
        ))}
      </div>
    </>
  );
}
