import { useQuery } from "@apollo/client";
import {
  SORT_QUESTIONS_BY_LIKE_QUERY,
  SORT_QUESTIONS_BY_TIME_QUERY,
  ALL_USERS_QUERY,
} from "../../graphql/queries.ts";
import ForumItem from "./ForumItem.tsx";
import type { Question, User } from "@shared/shared_types.ts";

type filter = {
  order: string;
};

const ForumList = (filter: filter) => {
  const { order } = filter;
  const {
    loading: question_loading,
    error: question_error,
    data: question_data,
  } = useQuery(SORT_QUESTIONS_BY_TIME_QUERY);
  const {
    loading: question_like_loading,
    error: question_like_error,
    data: question_like_data,
  } = useQuery(SORT_QUESTIONS_BY_LIKE_QUERY);
  const {
    loading: user_loading,
    error: user_error,
    data: user_data,
  } = useQuery(ALL_USERS_QUERY);

  if (question_loading) return "Loading...";
  if (question_error) return `Error! ${question_error.message}`;
  if (question_like_loading) return "Loading...";
  if (question_like_error) return `Error! ${question_like_error.message}`;
  if (user_loading) return "Loading...";
  if (user_error) return `Error! ${user_error?.message}`;

  const sortbytime = JSON.parse(
    JSON.stringify(question_data?.SortQuestionsByTime),
  );
  const sortbylikes = JSON.parse(
    JSON.stringify(question_like_data?.SortQuestionsByLike),
  );
  const users = JSON.parse(JSON.stringify(user_data?.AllUsers));

  return (
    <>
      {order === "time" &&
        sortbytime.map((question: Question) => {
          const user = users.filter(
            (user: User) => user.id === question.askerId,
          )[0];
          const time = new Date(Date.parse(question.date))
            .toISOString()
            .split("T")[0];
          return (
            <ForumItem
              key={question.id}
              id={question.id}
              title={question.title}
              asker={user.name}
              askerId={user.id}
              likes={question.likesId.length}
              date={time}
              content={question.content}
              tags={question.tags}
              photoLink={user.photoLink}
            />
          );
        })}
      {order === "like" &&
        sortbylikes.map((question: Question) => {
          const user = users.filter(
            (user: User) => user.id === question.askerId,
          )[0];
          const time = new Date(Date.parse(question.date))
            .toISOString()
            .split("T")[0];
          return (
            <ForumItem
              key={question.id}
              id={question.id}
              title={question.title}
              asker={user.name}
              askerId={user.id}
              likes={question.likesId.length}
              date={time}
              content={question.content}
              tags={question.tags}
              photoLink={user.photoLink}
            />
          );
        })}
    </>
  );
};

export default ForumList;
