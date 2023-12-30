// for Mutation.tsx
export interface AnnouncementInput {
  title: string;
  content: string;
}

export interface UserInput {
  name: string;
  studentID: string;
  password: string;
  photoLink: string;
  introduction: string;
}

export interface UserPasswordInput {
  password: string;
}

export interface UserProfileInput {
  name: string;
  introduction: string;
  studentID: string;
  photoLink: string;
}

export interface ArticleInput {
  writerId: number;
  title: string;
  content: string;
  tags: string[];
  topic: string;
}

export interface ArticleCommentInput {
  commenterId: number;
  content: string;
  rootArticleId: number;
}

export interface ArticleLikeInput {
  likerId: number;
  articleId: number;
}

export interface ArticleCommentLikeInput {
  likerId: number;
  articleCommentId: number;
}

export interface QuestionInput {
  askerId: number;
  title: string;
  content: string;
  topic: string;
  tags: string[];
}

export interface QuestionCommentInput {
  commenterId: number;
  rootQuestionId: number;
  content: string;
}

export interface QuestionLikeInput {
  likerId: number;
  questionId: number;
}

export interface QuestionCommentLikeInput {
  likerId: number;
  questionCommentId: number;
}

export interface SolutionInput {
  solverId: number;
  rootQuestionId: number;
  content: string;
}

export interface SolutionCommentInput {
  commenterId: number;
  rootSolutionId: number;
  content: string;
}

export interface SolutionLikeInput {
  likerId: number;
  solutionId: number;
}

export interface SolutionCommentLikeInput {
  likerId: number;
  solutionCommentId: number;
}
