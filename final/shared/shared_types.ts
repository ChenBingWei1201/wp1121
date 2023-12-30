export type User = {
  id: number;
  name: string;
  studentId: string;
  password: string;
  photoLink: string;
  introduction?: string;
};

export type Question = {
  id: number;
  askerId: number;
  date: string;
  title: string;
  content: string;
  topic: string;
  tags: string[];
  likesId: number[];
};

export type QuestionComment = {
  id: number;
  commenter: string;
  date: string;
  content: string;
  tags: string[];
  likes: number[];
};

export type Solution = {
  id: number;
  solver: string;
  date: string;
  content: string;
  likes: number[];
};

export type SolutionComment = {
  id: number;
  commenter: string;
  date: string;
  content: string;
  likes: number[];
};

export type Article =
  | ({
      __typename?: "Article" | undefined;
      id: number;
      writerId: number;
      date: string;
      title: string;
      content: string;
      tags: (string | null)[];
      topic: string;
      commentsId: (number | null)[];
      likesId: (number | null)[];
    } | null)[]
  | null
  | undefined;

export type ArticleComment = {
  id: number;
  commenter: string;
  date: string;
  content: string;
  likes: number[];
};

export type Announcement = {
  id: number;
  date: string;
  title: string;
  content: string;
};