import { pubsub } from "../PubSub/pubsub.ts";

const Subscription = {
  // Announcement Start
  AnnouncementCreated: {
    subscribe: () => pubsub.asyncIterator(["ANNOUNCEMENT_CREATED"]),
  },

  AnnouncementDeleted: {
    subscribe: () => pubsub.asyncIterator(["ANNOUNCEMENT_DELETED"]),
  },

  AnnouncementUpdated: {
    subscribe: () => pubsub.asyncIterator(["ANNOUNCEMENT_UPDATED"]),
  },
  // Announcement End

  // User Start
  UserCreated: {
    subscribe: () => pubsub.asyncIterator(["USER_CREATED"]),
  },

  UserDeleted: {
    subscribe: () => pubsub.asyncIterator(["USER_DELETED"]),
  },

  UserUpdated: {
    subscribe: () => pubsub.asyncIterator(["USER_UPDATED"]),
  },
  // User End

  // Question Start
  QuestionCreated: {
    subscribe: () => pubsub.asyncIterator(["QUESTION_CREATED"]),
  },

  QuestionDeleted: {
    subscribe: () => pubsub.asyncIterator(["QUESTION_DELETED"]),
  },

  QuestionUpdated: {
    subscribe: () => pubsub.asyncIterator(["QUESTION_UPDATED"]),
  },

  QuestionCommentCreated: {
    subscribe: () => pubsub.asyncIterator(["QUESTION_COMMENT_CREATED"]),
  },

  QuestionCommentDeleted: {
    subscribe: () => pubsub.asyncIterator(["QUESTION_COMMENT_DELETED"]),
  },

  QuestionCommentUpdated: {
    subscribe: () => pubsub.asyncIterator(["QUESTION_COMMENT_UPDATED"]),
  },

  QuestionLiked: {
    subscribe: () => pubsub.asyncIterator(["QUESTION_LIKED"]),
  },

  QuestionUnliked: {
    subscribe: () => pubsub.asyncIterator(["QUESTION_UNLIKED"]),
  },

  QuestionCommentLiked: {
    subscribe: () => pubsub.asyncIterator(["QUESTION_COMMENT_LIKED"]),
  },

  QuestionCommentUnliked: {
    subscribe: () => pubsub.asyncIterator(["QUESTION_COMMENT_UNLIKED"]),
  },

  SolutionCreated: {
    subscribe: () => pubsub.asyncIterator(["SOLUTION_CREATED"]),
  },

  SolutionDeleted: {
    subscribe: () => pubsub.asyncIterator(["SOLUTION_DELETED"]),
  },

  SolutionUpdated: {
    subscribe: () => pubsub.asyncIterator(["SOLUTION_UPDATED"]),
  },

  SolutionCommentCreated: {
    subscribe: () => pubsub.asyncIterator(["SOLUTION__COMMENT_CREATED"]),
  },

  SolutionCommentDeleted: {
    subscribe: () => pubsub.asyncIterator(["SOLUTION_COMMENT_DELETED"]),
  },

  SolutionCommentUpdated: {
    subscribe: () => pubsub.asyncIterator(["SOLUTION_COMMENT_UPDATED"]),
  },

  SolutionLiked: {
    subscribe: () => pubsub.asyncIterator(["SOLUTION_LIKED"]),
  },

  SolutionUnliked: {
    subscribe: () => pubsub.asyncIterator(["SOLUTION_UNLIKED"]),
  },

  SolutionCommentLiked: {
    subscribe: () => pubsub.asyncIterator(["SOLUTION_COMMENT_LIKED"]),
  },

  SolutionCommentUnliked: {
    subscribe: () => pubsub.asyncIterator(["SOLUTION_COMMENT_UNLIKED"]),
  },
  // QuestionEnd

  // Article Start
  ArticleCreated: {
    subscribe: () => pubsub.asyncIterator(["ARTICLE_CREATED"]),
  },

  ArticleDeleted: {
    subscribe: () => pubsub.asyncIterator(["ARTICLE_DELETED"]),
  },

  ArticleUpdated: {
    subscribe: () => pubsub.asyncIterator(["ARTICLE_UPDATED"]),
  },
  // Article End

  // ArticleComment Start
  ArticleCommentCreated: {
    subscribe: () => pubsub.asyncIterator(["ARTICLECOMMENT_CREATED"]),
  },

  ArticleCommentDeleted: {
    subscribe: () => pubsub.asyncIterator(["ARTICLECOMMENT_DELETED"]),
  },

  ArticleCommentUpdated: {
    subscribe: () => pubsub.asyncIterator(["ARTICLECOMMENT_UPDATED"]),
  },
  // Article End
  // ArticleComment End

  // ArticleLike Start
  ArticleLiked: {
    subscribe: () => pubsub.asyncIterator(["ARTICLE_LIKED"]),
  },
  ArticleUnliked: {
    subscribe: () => pubsub.asyncIterator(["ARTICLE_UNLIKED"]),
  },
  // ArticleLike End

  // Like ArticleComment Start
  ArticleCommentLiked: {
    subscribe: () => pubsub.asyncIterator(["ARTICLECOMMENT_LIKED"]),
  },

  ArticleCommentUnliked: {
    subscribe: () => pubsub.asyncIterator(["ARTICLECOMMENT_UNLIKED"]),
  },
  // Like ArticleComment End
};

export { Subscription };
