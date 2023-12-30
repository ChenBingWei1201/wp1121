import { useNavigate } from "react-router-dom";
import ArticleList from "../../components/Article/ArticleList";
import { useMutation } from "@apollo/client";
import { CREATE_ARTICLE_MUTATION } from "../../graphql";
import { useState, useContext } from "react";
// import Sidebar from "../../components/Article/SideBar";
import { Search } from "lucide-react";
import { UserContext } from "../../context/userContext";
const ArticleMainPage = () => {
  const { user } = useContext(UserContext);
  // if (!user) console.log(user);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("time");
  const [searchByTags, setSearchByTags] = useState("");
  const [search, setSearch] = useState("");
  const [createArticle, { loading, error }] = useMutation(
    CREATE_ARTICLE_MUTATION,
  );
  const handleCreateArticle = async () => {
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>{error.message}</div>;
    }
    if (user) {
      const newArticle = await createArticle({
        variables: {
          articleInput: {
            writerId: user.id,
            title: "# Title",
            content: "# Title",
            tags: [""],
            topic: "",
          },
        },
      });
      navigate(`/article/${newArticle.data?.CreateArticle?.id}/edit`);
    }
  };
  //
  const tags = [
    "Life",
    "Evalutaion",
    "ACG",
    "Programming",
    "Tech News",
    "Recruit",
  ];

  return (
    <>
      <div className="flex flex-row flex-auto">
        <div className="min-h-screen max-w-fit flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
          <div className="flex flex-col top-0 left-0 w-64 bg-gray-50 h-full border-r">
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
              <ul className="flex flex-col py-4 space-y-1">
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">
                      Menu
                    </div>
                  </div>
                </li>
                {tags.map((tag) => {
                  return (
                    <button
                      key={tag}
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                      onClick={() => setSearchByTags(`${tag}`)}
                    >
                      <li key={tag}>
                        <span className="ml-2 text-sm tracking-wide truncate">{`${tag}`}</span>
                      </li>
                    </button>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow overflow-x-hidden min-h-screen bg-slate-100">
          <div className="flex flex-row min-h-fit justify-between bg-slate-50">
            <div className="flex">
              <button
                onClick={() => setFilter("time")}
                className="border-2 p-2 m-1 text-md font-bold text-black bg-gray-200 hover:text-white hover:bg-gray-400 px-4 rounded self-center"
              >
                最新
              </button>
              <button
                onClick={() => setFilter("like")}
                className="border-2 p-2 m-1 text-md font-bold text-black bg-gray-200 hover:text-white hover:bg-gray-400 px-4 rounded self-center"
              >
                最多讚
              </button>
            </div>

            <div className="flex max-w-md mx-auto">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-50 overflow-hidden">
                <button className="grid place-items-center h-full w-12 text-gray-300">
                  <Search />
                </button>

                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700"
                  type="text"
                  id="search"
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                  placeholder="Search something.."
                />
              </div>
            </div>

            <div className="flex justify-end">
              {user === null ? (
                <button
                  className="border-2 p-2 m-1 text-md font-bold text-black bg-gray-200 px-4 rounded self-center cursor-pointer"
                  disabled
                >
                  請先登入
                </button>
              ) : (
                <button
                  onClick={handleCreateArticle}
                  className="border-2 p-2 m-1 text-md font-bold text-black bg-gray-200 hover:text-white hover:bg-gray-400 px-4 rounded self-center"
                >
                  發文
                </button>
              )}
            </div>
          </div>
          <ArticleList
            filter={filter}
            searchByTags={searchByTags}
            search={search}
          />
        </div>
      </div>
    </>
  );
};

export default ArticleMainPage;
