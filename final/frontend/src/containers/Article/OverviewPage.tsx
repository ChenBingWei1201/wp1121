import { useQuery } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import CommentBox from "../../components/Common/CommentBox.tsx";
import CommentOverview from "../../components/Common/CommentOverview.tsx";
import {
  ALL_ARTICLES_QUERY,
  ALL_LIKED_ARTICLES_QUERY,
  ALL_ARTICLECOMMENTS_QUERY,
} from "../../graphql";
import Select from "../../components/Common/Select.tsx";

import { MDXEditor } from "@mdxeditor/editor/MDXEditor";
import { allPlugins } from "../../components/Common/MDX/allPlugins";
import type { FunctionComponent } from "react";
import LikeButton from "../../components/Common/LikeButton.tsx";
import { UserContext } from "../../context/userContext.tsx";
import { useContext } from "react";
const ArticlePageOverview = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const likerId = 1;
  const {
    loading: allArticlesLoading,
    error: allArticlesError,
    data: allArticlesData,
  } = useQuery(ALL_ARTICLES_QUERY);

  const {
    loading: likedArticlesLoading,
    error: likedArticlesError,
    data: likedArticlesData,
  } = useQuery(ALL_LIKED_ARTICLES_QUERY, {
    variables: {
      likerId: likerId,
    },
  });
  const {
    loading: allArticleCommentsLoading,
    error: allArticleCommentsError,
    data: allArticleCommentsData,
  } = useQuery(ALL_ARTICLECOMMENTS_QUERY);

  if (allArticlesLoading) return "Loading...";
  if (allArticlesError) return `Error! ${allArticlesError.message}`;

  if (!id) throw new Error("id is undefined");
  const articleId = parseInt(id);

  const [theArticle] = allArticlesData?.AllArticles?.filter(
    (e: { id: number }) => e.id === articleId,
  );
  const articleContent = theArticle?.content;
  const articleTags = theArticle?.tags;

  if (likedArticlesLoading) return "Loading...";
  if (likedArticlesError) return `Error! ${likedArticlesError.message}`;
  const intialLiked = likedArticlesData?.AllLikedArticles?.some(
    (article) => article?.id === articleId,
  );

  if (allArticleCommentsLoading) return "Loading...";
  if (allArticleCommentsError)
    return `Error! ${allArticleCommentsError.message}`;
  const allArticleComments = allArticleCommentsData?.AllArticleComments?.filter(
    (comment) => comment?.rootArticleId === articleId,
  );

  return (
    <>
      <div className="flex flex-col">
        <div
          id={id}
          className="bg-white m-5 p-5 w-[70%] min-h-[600px] ml-[15%] rounded-lg border border-gray-200 py-6 px-10"
        >
          <MDXEditor
            markdown={`${articleContent}`}
            plugins={allPlugins(`${articleContent}`)}
            readOnly
          />
        </div>
        <div>
          <Select tags={articleTags} setTags={undefined} />
        </div>
        <div className="flex flex-row justify-between">
          <LikeButton
            likerId={likerId}
            articleId={articleId}
            initialLiked={intialLiked}
          />

          {user !== null || undefined ? (
            <button
              onClick={() => navigate(`/article/${id}/edit`)}
              className="border-2 px-3 py-2 mr-[16%] mb-3 text-lginline-flex items-center text-lg font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 bg-blue-600 hover:bg-blue-700"
            >
              edit
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="block ml-auto mr-auto w-[70%]">
        {allArticleComments?.map((comment) => (
          <CommentOverview
            content={comment?.content}
            commenterId={comment?.commenterId}
            key={comment?.commenterId}
          />
        ))}
        <CommentBox rootArticleId={articleId} />
      </div>
    </>
  );
};

export default ArticlePageOverview as FunctionComponent;
