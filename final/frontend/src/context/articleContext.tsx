// import { createContext, useState, useContext } from "react";
// import type { Article } from "../../../shared/shared_types";
// import { useLazyQuery } from "@apollo/client";
// import { ALL_ARTICLES_QUERY } from "../graphql/index.ts";
// import { useCallback } from "react";

// export type ArticleContextType = {
//   articles: Article[];
//   setArticles: (article: Article[]) => void;
//   fetchArticles: () => Promise<void>;
// };

// export const ArticleContext = createContext<ArticleContextType>({
//   articles: [],
//   setArticles: () => {},
//   fetchArticles: async () => {},
// });

// type Props = {
//   children: React.ReactNode;
// };

// export function ArticleProvider({ children }: Props) {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [getAllArticles, { loading, error }] = useLazyQuery(ALL_ARTICLES_QUERY);
//   const fetchArticles = useCallback(async () => {
//     try {
//       if (loading) return console.log("Loading...");
//       if (error) return alert(`Error! ${error.message}`);
//       setArticles((await getAllArticles()).data?.AllArticles);
//       // console.log(articles);
//     } catch (err) {
//       console.log(err);
//       alert("Error: failed to fetch articles");
//     }
//   }, []);

//   return (
//     <ArticleContext.Provider value={{ articles, setArticles, fetchArticles }}>
//       {children}
//     </ArticleContext.Provider>
//   );
// }

// export default function useArticles() {
//   return useContext(ArticleContext);
// }
