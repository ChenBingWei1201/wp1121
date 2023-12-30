import { Link } from "react-router-dom";

const Sidebar = () => {
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
                  <Link
                    key={tag}
                    to={`/article/${tag}`}
                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                  >
                    <li key={tag}>
                      <span
                        key={tag}
                        className="ml-2 text-sm tracking-wide truncate"
                      >{`${tag}`}</span>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
