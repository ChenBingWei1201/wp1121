import { useQuery } from "@apollo/client";
import Sidebar from "../components/Common/Sidebar";
import {
  ALL_USERS_QUERY,
  HOMEPAGE_ANNOUNCEMENTS_QUERY,
  HOMEPAGE_ARTICLES_QUERY,
  HOMEPAGE_QUESTIONS_QUERY,
} from "../graphql";
import type {
  Announcement,
  Article,
  Question,
  User,
} from "@shared/shared_types";
import ArticleItem from "../components/Article/ArticleItem";
import ForumItem from "../components/Forum/ForumItem";

type AnnouncementItemProps = {
  id: number;
  date: string;
  title: string;
  content: string;
};

const AnnouncementItem = ({
  // id,
  date,
  title,
  content,
}: AnnouncementItemProps) => {
  return (
    <>
      <div className="dark:bg-gray-800 dark:text-gray-50 bg-white rounded-lg m-0.5">
        <div className="container grid grid-cols-12 mx-auto dark:bg-gray-900">
          <div className="flex flex-col p-6 col-span-full row-span-full lg:p-10">
            <h1 className="text-3xl font-semibold text-start m-2 mb-0 border-b-2 border-white">{`${date} ${title}`}</h1>
            <p>{`${content}`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const HomePage = () => {
  const {
    loading: announcement_loading,
    error: announcement_error,
    data: announcement_data,
  } = useQuery(HOMEPAGE_ANNOUNCEMENTS_QUERY);

  const {
    loading: article_loading,
    error: article_error,
    data: article_data,
  } = useQuery(HOMEPAGE_ARTICLES_QUERY);

  const {
    loading: question_loading,
    error: question_error,
    data: question_data,
  } = useQuery(HOMEPAGE_QUESTIONS_QUERY);

  const {
    loading: user_loading,
    error: user_error,
    data: user_data,
  } = useQuery(ALL_USERS_QUERY);

  if (announcement_loading) return "Loading...";
  if (announcement_error) return `Error! ${announcement_error?.message}`;
  if (article_loading) return "Loading...";
  if (article_error) return `Error! ${article_error?.message}`;
  if (question_loading) return "Loading...";
  if (question_error) return `Error! ${question_error?.message}`;
  if (user_loading) return "Loading...";
  if (user_error) return `Error! ${user_error?.message}`;

  const announcement = JSON.parse(
    JSON.stringify(announcement_data?.HomepageAnnouncements),
  );

  const question = JSON.parse(JSON.stringify(question_data?.HomepageQuestions));

  const article = JSON.parse(JSON.stringify(article_data?.HomepageArticles));

  const users = JSON.parse(JSON.stringify(user_data?.AllUsers));

  return (
    <>
      <div className="flex flex-row flex-auto">
        <Sidebar />
        <div className="flex flex-col flex-grow overflow-x-hidden min-h-screen bg-slate-100">
          {announcement.length !== 0 && (
            <h1 className="flex bg-white justify-center rounded-full overflow-x-hidden mt-1 py-1">
              Announcement
            </h1>
          )}
          {announcement.map((announcement: Announcement) => {
            const time = new Date(Date.parse(announcement.date))
              .toISOString()
              .split("T")[0];
            return (
              <AnnouncementItem
                key={announcement.id}
                id={announcement.id}
                title={announcement.title}
                date={time}
                content={announcement.content}
              />
            );
          })}
          {article.length !== 0 && (
            <h1 className="flex bg-white justify-center rounded-full overflow-x-hidden mt-1 py-1">
              Article
            </h1>
          )}
          {article.map((article: Article) => {
            const user = users.filter(
              (user: User) => user.id === article.writerId,
            )[0];
            const time = new Date(Date.parse(article.date))
              .toISOString()
              .split("T")[0];
            return (
              <ArticleItem
                key={article.id}
                id={article.id}
                title={article.title}
                writer={user.name}
                writerId={user.id}
                likes={article.likesId.length}
                date={time}
                content={article.content}
                tags={article.tags}
                photoLink={user.photoLink}
              />
            );
          })}

          {question.length !== 0 && (
            <h1 className="flex bg-white justify-center rounded-full overflow-x-hidden mt-1 py-1">
              Question
            </h1>
          )}
          {question.map((question: Question) => {
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
