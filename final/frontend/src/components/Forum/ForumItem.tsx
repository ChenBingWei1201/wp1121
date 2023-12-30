import { Link } from "react-router-dom";
import facebookURL from "../../images/facebook.png";
import logoURL from "../../images/lightning.png";

type ForumItemProps = {
  id: number;
  title: string;
  asker: string;
  askerId: number;
  date: string;
  likes: number;
  photoLink: string;
  // topic: string;
  content: string;
  tags: string[];
};

const ForumItem = ({
  id,
  title,
  asker,
  askerId,
  date,
  likes,
  // photoLink,
  content,
  tags,
}: ForumItemProps) => {
  return (
    <>
      <div className="dark:bg-gray-800 dark:text-gray-50 bg-white rounded-lg m-0.5">
        <div className="container grid grid-cols-12 mx-auto dark:bg-gray-900">
          <div className="flex flex-col p-6 col-span-full row-span-full lg:p-10">
            <Link to={`/forum/${id}`}>
              <h1 className="text-3xl font-semibold text-start m-2 mb-0 border-b-2 border-white">{`${title}`}</h1>
            </Link>
            <div className="flex justify-start my-2">
              {tags.map((tag) => (
                //   <Link to={`/${tag}`}>
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full dark:bg-violet-400 dark:text-gray-900 bg-sky-200"
                >{`${tag}`}</span>
                // </Link>
              ))}
            </div>
            <Link to={`/forum/${id}`} className="flex grow flex-1 p-2">
              <p className="flex-1">{`${content}`}</p>
            </Link>

            <div className="flex items-center justify-between pt-2">
              <div className="flex space-x-2">
                <Link to={`/user/${askerId}`} className="w-8 m-1">
                  <img
                    src={facebookURL}
                    alt="twitter link"
                    className="rounded-full"
                  />
                </Link>
                <Link to={`/user/${askerId}`} className="flex self-center px-2">
                  <span className="self-center text-base text-slate-500">
                    by {`${asker}`}
                  </span>
                </Link>
                <span className="self-center text-base text-slate-500">{`${date}`}</span>
              </div>
              <div className="flex flex-row">
                <img src={logoURL} alt="logo" className="w-8 m-1" />
                <p className="flex self-center px-2">{`${likes}`} likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumItem;
