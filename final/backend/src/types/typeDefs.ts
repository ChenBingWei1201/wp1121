const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  ### Define Data Structure ###

  #### type def ###

  type Announcement {
    id: Int!
    title: String!
    date: String!
    content: String!
  }

  type User {
    id: Int!
    name: String!
    studentID: String!
    password: String!
    photoLink: String!
    introduction: String
    questionsId: [Int]!
    questionCommentsId: [Int]!
    solutionsId: [Int]!
    solutionCommentsId: [Int]!
    articlesId: [Int]!
    articleCommentsId: [Int]!
    likedQuestionsId: [Int]!
    likedQuestionCommentsId: [Int]!
    likedSolutionsId: [Int]!
    likedSolutionCommentsId: [Int]!
    likedArticlesId: [Int]!
    likedArticleCommentsId: [Int]!
  }

  type Article {
    id: Int!
    writerId: Int!
    date: String!
    title:  String!
    content:  String!
    tags: [String]!
    topic:  String!
    commentsId: [Int]!
    likesId: [Int]!
  }

  type ArticleComment {
    id: Int!
    commenterId:  Int!
    content:  String!
    date: String!
    rootArticleId: Int!
    likesId: [Int]!
  }

  type LikedArticle {
    id: Int!
    likerId: Int!
    articleId: Int!
  }

  type LikedArticleComment {
    id: Int!
    likerId: Int!
    articleCommentId: Int!
  }

  type Question {
    id: Int!
    askerId: Int!
    title: String!
    date: String!
    content: String!
    topic: String!
    tags: [String]!
    commentsId: [Int]!
    solutionsId: [Int]!
    likesId: [Int]!
  }

  type QuestionComment {
    id: Int!
    commenterId: Int!
    rootQuestionId: Int!
    content: String!
    date: String!
  }

  type LikedQuestion {
    id: Int!
    likerId: Int!
    questionId: Int!
  }

  type LikedQuestionComment {
    id: Int!
    likerId: Int!
    questionCommentId: Int!
  }

  type Solution {
    id: Int!
    solverId: Int!
    rootQuestionId: Int!
    content: String!
    date: String!
    likesId: [Int]!
    commentsId: [Int]!
  }

  type SolutionComment {
    id: Int!
    commenterId: Int!
    rootSolutionId: Int!
    content: String!
    date: String!
  }

  type LikedSolution {
    id: Int!
    likerId: Int!
    solutionId: Int!
  }

  type LikedSolutionComment {
    id: Int!
    likerId: Int!
    solutionCommentId: Int!
  }

  ### input def #####

  input AnnouncementInput {
    title: String!
    content: String!
  }

  input UserInput {
    name: String!
    studentID: String!
    password: String!
    photoLink: String!
    introduction: String
  }

  input UserProfileInput {
    name: String!
    studentID: String!
    photoLink: String!
    introduction: String
  }

  input UserPasswordInput {
    password: String!
  }

  input ArticleInput {
    writerId: Int! 
    title:    String!
    content:  String!
    tags:     [String]!
    topic:    String!
  }

  input ArticleCommentInput {
    commenterId: Int!
    content: String!
    rootArticleId: Int!
  }

  input ArticleLikeInput {
    likerId: Int!
    articleId: Int!
  }

  input ArticleCommentLikeInput {
    likerId: Int!
    articleCommentId: Int!
  }

  input QuestionInput {
    askerId: Int!
    title: String!
    content: String!
    topic: String!
    tags: [String]!
  }

  input QuestionCommentInput {
    commenterId: Int!
    rootQuestionId: Int!
    content: String!
  }
  
  input QuestionLikeInput {
    likerId: Int!
    questionId: Int!
  }

  input QuestionCommentLikeInput {
    likerId: Int!
    questionCommentId: Int!
  }

  input SolutionInput {
    solverId: Int!
    rootQuestionId: Int!
    content: String!
  }

  input SolutionCommentInput {
    commenterId: Int!
    rootSolutionId: Int!
    content: String!
  }

  input SolutionLikeInput {
    likerId: Int!
    solutionId: Int!
  }

  input SolutionCommentLikeInput {
    likerId: Int!
    solutionCommentId: Int!
  }

  ### Define Resolvers ###

  type Query {
    AllAnnouncements: [Announcement]
    HomepageAnnouncements: [Announcement]
    AllUsers: [User]
    # Article
    AllArticles: [Article]
    AllArticleComments: [ArticleComment]
    HomepageArticles: [Article]
    SortArticlesByTime: [Article]
    SortArticlesByLike: [Article]
    AllLikedArticles(likerId: Int!): [Article]
    AllLikedArticleComments(likerId: Int!): [ArticleComment]
    # Question
    AllQuestions: [Question]
    AllQuestionComments: [QuestionComment]
    HomepageQuestions: [Question]
    SortQuestionsByTime: [Question]
    SortQuestionsByLike: [Question]
    AllLikedQuestions(likerId: Int!): [Question]
    AllLikedQuestionComments(likerId: Int!): [QuestionComment]
    # Solution
    AllSolutions: [Solution]
    AllSolutionComments: [SolutionComment]
    AllLikedSolutions(likerId: Int!): [Solution]
    AllLikedSolutionComments(likerId: Int!): [SolutionComment]
  }

  type Mutation {
    # Announcement
    CreateAnnouncement(announcementInput: AnnouncementInput!): Announcement
    DeleteAnnouncement(id: Int!): Announcement
    UpdateAnnouncement(id: Int!, announcementInput: AnnouncementInput!): Announcement
    # User
    CreateUser(userInput: UserInput!): User
    DeleteUser(id: Int!): User
    UpdateUser(id: Int!, userInput: UserInput!): User
    UpdateUserPassword(id: Int!, userPasswordInput: UserPasswordInput!): User
    UpdateUserProfile(id: Int!, userProfileInput: UserProfileInput!): User
    # Article
    CreateArticle(articleInput: ArticleInput!): Article
    DeleteArticle(id: Int!): Article
    UpdateArticle(id: Int!, articleInput: ArticleInput!): Article
    # ArticleComment
    CreateArticleComment(articleCommentInput: ArticleCommentInput!): ArticleComment
    DeleteArticleComment(id: Int!): ArticleComment
    UpdateArticleComment(id: Int!, articleCommentInput: ArticleCommentInput!): ArticleComment
    # LikeArticle
    LikeArticle(articleLikeInput: ArticleLikeInput!): LikedArticle # just like "create"
    UnlikeArticle(articleUnlikeInput: ArticleLikeInput!): LikedArticle # just like "delete"
    # LikeArticleComment
    LikeArticleComment(articleCommentLikeInput: ArticleCommentLikeInput!): LikedArticleComment # just like "create"
    UnlikeArticleComment(articleCommentUnlikeInput: ArticleCommentLikeInput!): LikedArticleComment # just like "delete"
    # Question
    CreateQuestion(questionInput: QuestionInput!): Question
    DeleteQuestion(id: Int!): Question
    UpdateQuestion(id: Int!, questionInput: QuestionInput!): Question
    # QuestionComment
    CreateQuestionComment(questionCommentInput: QuestionCommentInput!): QuestionComment
    DeleteQuestionComment(id: Int!): QuestionComment
    UpdateQuestionComment(id: Int!, questionCommentInput: QuestionCommentInput!): QuestionComment
    # LikeQuestion
    LikeQuestion(questionLikeInput: QuestionLikeInput!): LikedQuestion
    UnlikeQuestion(questionUnlikeInput: QuestionLikeInput!): LikedQuestion
    # LikeQuestionComment
    LikeQuestionComment(questionCommentLikeInput: QuestionCommentLikeInput!): LikedQuestionComment
    UnlikeQuestionComment(questionCommentUnlikeInput: QuestionCommentLikeInput!): LikedQuestionComment
    # Solution
    CreateSolution(solutionInput: SolutionInput!): Solution
    DeleteSolution(id: Int!): Solution
    UpdateSolution(id: Int!, solutionInput: SolutionInput!): Solution
    # SolutionComment
    CreateSolutionComment(solutionCommentInput: SolutionCommentInput!): SolutionComment
    DeleteSolutionComment(id: Int!): SolutionComment
    UpdateSolutionComment(id: Int!, solutionCommentInput: SolutionCommentInput!): SolutionComment
    # LikeSolution
    LikeSolution(solutionLikeInput: SolutionLikeInput!): LikedSolution
    UnlikeSolution(solutionUnlikeInput: SolutionLikeInput!): LikedSolution
    # LikeSolutionComment
    LikeSolutionComment(solutionCommentLikeInput: SolutionCommentLikeInput!): LikedSolutionComment
    UnlikeSolutionComment(solutionCommentUnlikeInput: SolutionCommentLikeInput!): LikedSolutionComment
  }

  type Subscription {
    # Announcement
    AnnouncementCreated: Announcement
    AnnouncementDeleted: Announcement
    AnnouncementUpdated: Announcement
    # User
    UserCreated: User
    UserDeleted: User
    UserUpdated: User
    # Article
    ArticleCreated: Article
    ArticleDeleted: Article
    ArticleUpdated: Article
    # ArticleComment
    ArticleCommentCreated: ArticleComment
    ArticleCommentDeleted: ArticleComment
    ArticleCommentUpdated: ArticleComment
    # LikeArticle
    ArticleLiked: LikedArticle
    ArticleUnliked: LikedArticle
    # LikeArticleComment
    ArticleCommentLiked: LikedArticleComment
    ArticleCommentUnliked: LikedArticleComment
    # Question
    QuestionCreated: Question
    QuestionDeleted: Question
    QuestionUpdated: Question
    # QuestionComment
    QuestionCommentCreated: QuestionComment
    QuestionCommentDeleted: QuestionComment
    QuestionCommentUpdated: QuestionComment
    # LikeQuestion
    QuestionLiked: LikedQuestion
    QuestionUnliked: LikedQuestion
    # LikeQuestionComment
    QuestionCommentLiked: LikedQuestionComment
    QuestionCommentUnliked: LikedQuestionComment
    # Solution
    SolutionCreated: Solution
    SolutionDeleted: Solution
    SolutionUpdated: Solution
    # SolutionComment
    SolutionCommentCreated: SolutionComment
    SolutionCommentDeleted: SolutionComment
    SolutionCommentUpdated: SolutionComment
    # LikeSolution
    SolutionLiked: LikedSolution
    SolutionUnliked: LikedSolution
    # LikeSolutionComment
    SolutionCommentLiked: LikedSolutionComment
    SolutionCommentUnliked: LikedSolutionComment
  }
`;

export { typeDefs };
