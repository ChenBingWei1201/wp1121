import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useContext } from "react";
// import useArticles from "../../context/articleContext.tsx";
import { useQuery, useMutation } from "@apollo/client";
// import useArticles from "../../context/articleContext.tsx";
import { UserContext } from "../../context/userContext.tsx";
import Select from "../../components/Common/Select.tsx";

import {
  ALL_ARTICLES_QUERY,
  UPDATE_ARTICLE_MUTATION,
} from "../../graphql/index.ts";
import TextArea from "../../components/Common/MDX/TextArea.tsx";

type handleUpdateProps = {
  article: string;
  tags: string[];
};

function EdittingPage() {
  const { user } = useContext(UserContext);
  // const { fetchArticles } = useArticles();
  const { id } = useParams();
  if (!id) throw new Error("id is undefined");
  const navigate = useNavigate();
  const ref = useRef();
  // const { data: allData, error: allError } = useQuery(ALL_ARTICLES_QUERY);
  // const [article, setArticle] = useState("# Title");
  // const {articles, fetchArticles} = useArticles(); // initialize with default value
  const [tags, setTags] = useState<string[]>([]); // initialize with default value
  const {
    loading: allArticlesLoading,
    error: allArticlesError,
    data: allArticlesData,
  } = useQuery(ALL_ARTICLES_QUERY);

  const [updateArticle, { loading, error }] = useMutation(
    UPDATE_ARTICLE_MUTATION,
  );

  const handleUpdate = async ({ article, tags }: handleUpdateProps) => {
    // console.log(article + tags);
    if (!article) throw new Error("article is undefined!");
    if (!tags) throw new Error("tags is undefined!");
    if (loading) return "Submitting...";
    if (error) return `Submission error! ${error.message}`;
    // console.log(article);
    const updatedArticle = await updateArticle({
      variables: {
        updateArticleId: parseInt(id),
        articleInput: {
          title: article.split("\n")[0],
          content: article,
          tags: tags,
          topic: "test",
          writerId: 1,
        },
      },
    });
    navigate(`/article/${updatedArticle.data?.UpdateArticle?.id}`);
  };

  if (allArticlesLoading) return "Loading...";
  if (allArticlesError) return `Error! ${allArticlesError.message}`;

  const articleId = parseInt(id);

  const [theArticle] = allArticlesData?.AllArticles?.filter(
    (e: { id: number }) => e.id === articleId,
  );
  const articleContent = theArticle?.content;

  return (
    <>
      <div className="w-[70%] min-h-[600px] ml-[17%] bg-white m-5 py-6 px-10 shadow hover:shadow-lg rounded-lg">
        <TextArea article={articleContent} editorRef={ref} />
      </div>
      <div className="flex flex-row h-10% justify-evenly">
        <Select tags={tags} setTags={setTags} />

        <div className="flex flex-row-reverse">
          <button
            onClick={() => handleUpdate({ article: ref.current.getMarkdown(), tags })}
            className="m-2 border-2 px-3 h-16 w-20 text-lginline-flex items-center py-2.5 px-4 text-xl font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 bg-blue-600 hover:bg-blue-700"
            disabled={user === null}
          >
            post
          </button>
        </div>
      </div>
    </>
  );
}
export default EdittingPage as React.FC;
