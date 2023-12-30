import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Forum/SideBar";
import ForumList from "../../components/Forum/ForumList";
import { Search } from "lucide-react";

const ForumMainPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("time");
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="flex flex-row flex-auto">
        <Sidebar />
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
              <button
                onClick={() => navigate("/forum/draft")}
                className="border-2 p-2 m-1 text-md font-bold text-black bg-gray-200 hover:text-white hover:bg-gray-400 px-4 rounded self-center"
              >
                發問
              </button>
            </div>
          </div>
        </div>
        <ForumList order={filter} />
      </div>
    </>
  );
};

export default ForumMainPage;
