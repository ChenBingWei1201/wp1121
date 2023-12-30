// import { Link } from "react-router-dom";

const Sidebar = () => {
  // const forums = [
  //   "Freshman",
  //   "Sophomore",
  //   "Junior",
  //   "Senior",
  //   "Master",
  //   "PhD",
  //   "Postdoctoral",
  // ];
  // const articles = [
  //   "Life",
  //   "Evalutaion",
  //   "ACG",
  //   "Programming",
  //   "Tech News",
  //   "Recruit",
  // ];

  return (
    <>
      {/* <div className="min-h-screen max-w-fit flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
        <div className="flex flex-col top-0 left-0 w-64 bg-gray-50 h-full border-r">
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="py-1 px-5 bg-slate-100">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Forum
                  </div>
                </div>
              </li>
              {forums.map((tag) => {
                return (
                  <li key={tag}>
                    <Link
                      to={`/forum`}
                      // to={`/forum/${tag}`}
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    >
                      <span className="ml-2 text-sm tracking-wide truncate">{`${tag}`}</span>
                    </Link>
                  </li>
                );
              })}
              <li className="py-1 px-5 bg-slate-100">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-500">
                    Article
                  </div>
                </div>
              </li>
              {articles.map((tag) => {
                return (
                  <li key={tag}>
                    <Link
                      to={`/article`}
                      // to={`/article/${tag}`}
                      className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                    >
                      <span className="ml-2 text-sm tracking-wide truncate">{`${tag}`}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
