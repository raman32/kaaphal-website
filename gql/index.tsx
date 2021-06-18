import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

/** Model For Advertisement */
export type Advertisement = {
  __typename?: 'Advertisement';
  backgroundColor?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  clicks?: Maybe<Scalars['Int']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  expiresAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  image?: Maybe<File>;
  order?: Maybe<Order>;
  post: Post;
  postId: Scalars['String'];
  startsAt: Scalars['Date'];
  status?: Maybe<AdvertisementStatus>;
  targetAgeLowerLimit: Scalars['Int'];
  targetAgeUpperLimit: Scalars['Int'];
  targetSex?: Maybe<AdvertisementTargetSex>;
  targetTags?: Maybe<Array<Tag>>;
  title?: Maybe<Scalars['String']>;
  type: AdvertisementType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  views?: Maybe<Scalars['Int']>;
};

export enum AdvertisementStatus {
  Blocked = 'blocked',
  Draft = 'draft',
  Expired = 'expired',
  Paused = 'paused',
  Published = 'published'
}

export enum AdvertisementTargetSex {
  Both = 'both',
  Female = 'female',
  Male = 'male'
}

export enum AdvertisementType {
  Banner = 'banner',
  Feeds = 'feeds',
  Post = 'post',
  Splash = 'splash'
}

/** Major Category for Post */
export type Answer = {
  __typename?: 'Answer';
  answer: McqAnswer;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  question: LoksewaQuestion;
  questionId: Scalars['String'];
  status: AnswerStatus;
  test: LoksewaTest;
  testId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export enum AnswerStatus {
  Correct = 'correct',
  Unanswered = 'unanswered',
  Wrong = 'wrong'
}

/** Major Category for Post */
export type Category = {
  __typename?: 'Category';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  name: Scalars['String'];
  parentType: PostType;
  post: Array<Post>;
  posts: Array<Post>;
  subCategories: Array<SubCategory>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  children?: Maybe<Array<Comment>>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  postId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type CommentConnection = {
  __typename?: 'CommentConnection';
  edges?: Maybe<Array<CommentEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CommentEdge = {
  __typename?: 'CommentEdge';
  cursor: Scalars['String'];
  node: Comment;
};

export type CreateCategoryInput = {
  name: Scalars['String'];
  parentType: PostType;
};

export type CreateCommentInput = {
  body: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  postId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateLoksewaMockCategoryInput = {
  negativeMarkingRatio?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  titleNP?: Maybe<Scalars['String']>;
  totalMins?: Maybe<Scalars['Int']>;
};

export type CreateLoksewaMockSetInput = {
  /** Category for Mock */
  categoryId?: Maybe<Scalars['String']>;
  editorId?: Maybe<Scalars['String']>;
  status: MockSetStatus;
  type: MockSetType;
};

export type CreateLoksewaQuestionCategoryInput = {
  title: Scalars['String'];
  titleNP?: Maybe<Scalars['String']>;
};

export type CreateLoksewaQuestionInput = {
  additionalDetails?: Maybe<Scalars['String']>;
  answer: McqAnswer;
  categoryId?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  edgeId?: Maybe<Scalars['String']>;
  metaId?: Maybe<Scalars['String']>;
  optionA?: Maybe<Scalars['String']>;
  optionB?: Maybe<Scalars['String']>;
  optionC?: Maybe<Scalars['String']>;
  optionD?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreatePostInput = {
  body?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  imageId?: Maybe<Scalars['String']>;
  language?: Maybe<Language>;
  slug?: Maybe<Scalars['String']>;
  status?: Maybe<PostStatus>;
  subCategoryId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
  type?: Maybe<PostType>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type CreateReactionInput = {
  postId: Scalars['String'];
  type?: Maybe<ReactionType>;
};

export type CreateScholarshipInput = {
  country?: Maybe<Scalars['String']>;
  deadlineAt?: Maybe<Scalars['Date']>;
  level: ScholarshipLevel;
  startsAt?: Maybe<Scalars['Date']>;
};

export type CreateSetQuestionInput = {
  additionalDetails?: Maybe<Scalars['String']>;
  answer: McqAnswer;
  categoryId?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  metaId?: Maybe<Scalars['String']>;
  optionA?: Maybe<Scalars['String']>;
  optionB?: Maybe<Scalars['String']>;
  optionC?: Maybe<Scalars['String']>;
  optionD?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  setId: Scalars['String'];
  title: Scalars['String'];
  weight: Scalars['Int'];
};

export type CreateSubCategoryInput = {
  name: Scalars['String'];
  parentId: Scalars['String'];
};

export type CreateTagInput = {
  advertisementId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateUserInput = {
  displayName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};


export enum Difficulty {
  Easy = 'easy',
  Hard = 'hard',
  Medium = 'medium',
  VeryEasy = 'veryEasy',
  VeryHard = 'veryHard'
}

export type File = {
  __typename?: 'File';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  height: Scalars['Int'];
  /** Unique UUID string */
  id: Scalars['ID'];
  name: Scalars['String'];
  post?: Maybe<Post>;
  preview: Scalars['String'];
  size: Scalars['Int'];
  source: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
  width: Scalars['Int'];
};

export type Flag = {
  __typename?: 'Flag';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  message: Scalars['String'];
  moderator: User;
  moderatorId: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  status: FlagStatus;
  type: FlagType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export enum FlagStatus {
  Inreview = 'inreview',
  Solved = 'solved',
  Submitted = 'submitted'
}

export enum FlagType {
  Fakenews = 'fakenews',
  Other = 'other',
  Outdated = 'outdated',
  Politicalcontent = 'politicalcontent',
  Religiouscontent = 'religiouscontent',
  Sexualcontent = 'sexualcontent',
  Slander = 'slander'
}

export type Follow = {
  __typename?: 'Follow';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  following: User;
  followingId: Scalars['String'];
  /** Unique UUID string */
  id: Scalars['ID'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type Hotshot = {
  __typename?: 'Hotshot';
  backgroundColor: Scalars['String'];
  body: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  image?: Maybe<File>;
  post?: Maybe<Post>;
  postId: Scalars['String'];
  title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export enum Language {
  En = 'en',
  Np = 'np'
}

export type LoksewaMockCategory = {
  __typename?: 'LoksewaMockCategory';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  negativeMarkingRatio?: Maybe<Scalars['Int']>;
  questionSets?: Maybe<Array<Maybe<LoksewaMockSet>>>;
  title?: Maybe<Scalars['String']>;
  titleNP?: Maybe<Scalars['String']>;
  totalMins?: Maybe<Scalars['Int']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type LoksewaMockSet = {
  __typename?: 'LoksewaMockSet';
  category?: Maybe<LoksewaMockCategory>;
  categoryId?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  editor?: Maybe<User>;
  editorId?: Maybe<Scalars['String']>;
  /** Unique UUID string */
  id: Scalars['ID'];
  loksewaTest: Array<LoksewaTest>;
  orders: Array<Order>;
  questions: Array<MockQuestionEdge>;
  status: MockSetStatus;
  type: MockSetType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type LoksewaQuestion = {
  __typename?: 'LoksewaQuestion';
  additionalDetails: Scalars['String'];
  answer: McqAnswer;
  category: LoksewaQuestionCategory;
  categoryId: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  difficulty: Difficulty;
  edge: MockQuestionEdge;
  edgeId: Scalars['String'];
  getMockCategoryFromSet: LoksewaMockCategory;
  /** Unique UUID string */
  id: Scalars['ID'];
  meta: LoksewaQuestionMeta;
  metaId: Scalars['String'];
  optionA: Scalars['String'];
  optionB: Scalars['String'];
  optionC: Scalars['String'];
  optionD: Scalars['String'];
  title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  userAnswer: Array<Answer>;
};

export type LoksewaQuestionCategory = {
  __typename?: 'LoksewaQuestionCategory';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  questions: Array<LoksewaQuestion>;
  title?: Maybe<Scalars['String']>;
  titleNP?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type LoksewaQuestionConnection = {
  __typename?: 'LoksewaQuestionConnection';
  edges?: Maybe<Array<LoksewaQuestionEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LoksewaQuestionEdge = {
  __typename?: 'LoksewaQuestionEdge';
  cursor: Scalars['String'];
  node: LoksewaQuestion;
};

export type LoksewaQuestionMeta = {
  __typename?: 'LoksewaQuestionMeta';
  LoksewaQuestion: Array<LoksewaQuestion>;
  body: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type LoksewaTest = {
  __typename?: 'LoksewaTest';
  answers: Array<Answer>;
  completed: Scalars['Boolean'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  score: Scalars['Int'];
  set: LoksewaMockSet;
  setId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export enum McqAnswer {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export type MagicLink = {
  __typename?: 'MagicLink';
  listener: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Membership = {
  __typename?: 'Membership';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  expiresAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  order: Order;
  type: MembershipType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export enum MembershipType {
  Bronze = 'bronze',
  Gold = 'gold',
  Silver = 'silver'
}

export type MockQuestionEdge = {
  __typename?: 'MockQuestionEdge';
  LoksewaMockSet: LoksewaMockSet;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  order: Scalars['Int'];
  question: LoksewaQuestion;
  questionId: Scalars['String'];
  setId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  weight: Scalars['Int'];
};

export enum MockSetStatus {
  Draft = 'draft',
  Hidden = 'hidden',
  Published = 'published'
}

export enum MockSetType {
  Free = 'free',
  Official = 'official',
  Premium = 'premium',
  Trial = 'trial'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAsset: File;
  createAssetOnServer: Scalars['Boolean'];
  createCategory: Category;
  createLoksewaCategory: LoksewaQuestionCategory;
  createLoksewaMockCategory: LoksewaMockCategory;
  createMeComment: Comment;
  createMePost: Post;
  createMockSet: LoksewaMockSet;
  createPost: Post;
  createQuestion: LoksewaQuestion;
  createSetQuestion: MockQuestionEdge;
  createSubCategory: Category;
  createTag: Category;
  createUser: User;
  deleteCategory: Scalars['Boolean'];
  deleteLoksewaCategory: Scalars['Boolean'];
  deleteLoksewaMockCategory: Scalars['Boolean'];
  deleteMeComment: Scalars['Boolean'];
  deleteMockSet: Scalars['Boolean'];
  deleteSubCategory: Scalars['Boolean'];
  increaseView: Scalars['Boolean'];
  reactToPost: Scalars['Boolean'];
  sendMagicLink: MagicLink;
  updateCategory: Category;
  updateLoksewaCategory: LoksewaQuestionCategory;
  updateLoksewaMockCategory: LoksewaMockCategory;
  updateMeComment: Comment;
  updateMeNotification: Scalars['Boolean'];
  updateMePost: Post;
  updateMockSet: LoksewaMockSet;
  updatePost: Post;
  updateQuestion: LoksewaQuestion;
  updateSetQuestion: MockQuestionEdge;
  updateSubCategory: Category;
};


export type MutationCreateAssetArgs = {
  file: Scalars['Upload'];
};


export type MutationCreateAssetOnServerArgs = {
  file: Scalars['Upload'];
};


export type MutationCreateCategoryArgs = {
  category: CreateCategoryInput;
};


export type MutationCreateLoksewaCategoryArgs = {
  category: CreateLoksewaQuestionCategoryInput;
};


export type MutationCreateLoksewaMockCategoryArgs = {
  category: CreateLoksewaMockCategoryInput;
};


export type MutationCreateMeCommentArgs = {
  comment: CreateCommentInput;
};


export type MutationCreateMePostArgs = {
  post: CreatePostInput;
};


export type MutationCreateMockSetArgs = {
  set: CreateLoksewaMockSetInput;
};


export type MutationCreatePostArgs = {
  post: CreatePostInput;
  scholarship?: Maybe<CreateScholarshipInput>;
};


export type MutationCreateQuestionArgs = {
  question: CreateLoksewaQuestionInput;
};


export type MutationCreateSetQuestionArgs = {
  question: CreateSetQuestionInput;
};


export type MutationCreateSubCategoryArgs = {
  subCategory: CreateSubCategoryInput;
};


export type MutationCreateTagArgs = {
  tag: CreateTagInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserInput;
};


export type MutationDeleteCategoryArgs = {
  category: UpdateCategoryInput;
};


export type MutationDeleteLoksewaCategoryArgs = {
  category: UpdateLoksewaQuestionCategoryInput;
};


export type MutationDeleteLoksewaMockCategoryArgs = {
  category: UpdateLoksewaMockCategoryInput;
};


export type MutationDeleteMeCommentArgs = {
  comment: UpdateCommentInput;
};


export type MutationDeleteMockSetArgs = {
  set: UpdateLoksewaMockSetInput;
};


export type MutationDeleteSubCategoryArgs = {
  subCategory: UpdateSubCategoryInput;
};


export type MutationIncreaseViewArgs = {
  postId: Scalars['String'];
};


export type MutationReactToPostArgs = {
  reaction: CreateReactionInput;
};


export type MutationSendMagicLinkArgs = {
  email: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  category: UpdateCategoryInput;
};


export type MutationUpdateLoksewaCategoryArgs = {
  category: UpdateLoksewaQuestionCategoryInput;
};


export type MutationUpdateLoksewaMockCategoryArgs = {
  category: UpdateLoksewaMockCategoryInput;
};


export type MutationUpdateMeCommentArgs = {
  comment: UpdateCommentInput;
};


export type MutationUpdateMeNotificationArgs = {
  notificationId: Scalars['String'];
};


export type MutationUpdateMePostArgs = {
  post: UpdatePostInput;
};


export type MutationUpdateMockSetArgs = {
  set: UpdateLoksewaMockSetInput;
};


export type MutationUpdatePostArgs = {
  post: UpdatePostInput;
};


export type MutationUpdateQuestionArgs = {
  question: UpdateLoksewaQuestionInput;
};


export type MutationUpdateSetQuestionArgs = {
  question: UpdateSetQuestionInput;
};


export type MutationUpdateSubCategoryArgs = {
  subCategory: UpdateSubCategoryInput;
};

export type Notification = {
  __typename?: 'Notification';
  body: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  post: Post;
  postId: Scalars['String'];
  read: Scalars['Boolean'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  url?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  advertisementId: Scalars['String'];
  advertsiment?: Maybe<Advertisement>;
  amountPaid: Scalars['Int'];
  body: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  membership?: Maybe<Membership>;
  membershipId: Scalars['String'];
  paymentId: Scalars['String'];
  paymentMethod: PaymentMethod;
  set?: Maybe<LoksewaMockSet>;
  setId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export enum PaymentMethod {
  Banktransfer = 'banktransfer',
  Cash = 'cash',
  Esewa = 'esewa',
  Imepay = 'imepay',
  Ipsconnect = 'ipsconnect',
  Phonepay = 'phonepay',
  Visa = 'visa'
}

/** Post model */
export type Post = {
  __typename?: 'Post';
  advertisement?: Maybe<Advertisement>;
  body?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['String']>;
  comments: Array<Comment>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
  editor?: Maybe<User>;
  editorId?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  flag?: Maybe<Array<Maybe<Flag>>>;
  hotShot?: Maybe<Hotshot>;
  /** Unique UUID string */
  id: Scalars['ID'];
  image?: Maybe<File>;
  language: Language;
  publishedAt?: Maybe<Scalars['Date']>;
  reactions?: Maybe<Array<Reaction>>;
  scholarship?: Maybe<Scholarship>;
  slug: Scalars['String'];
  status: PostStatus;
  subCategory?: Maybe<SubCategory>;
  subCategoryId?: Maybe<Scalars['String']>;
  tags: Array<Tag>;
  title: Scalars['String'];
  type: PostType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  url?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  views: Scalars['Int'];
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges?: Maybe<Array<PostEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String'];
  node: Post;
};

export enum PostStatus {
  Blocked = 'blocked',
  Commented = 'commented',
  Draft = 'draft',
  Hidden = 'hidden',
  Published = 'published',
  Unverified = 'unverified',
  Verified = 'verified'
}

export enum PostType {
  Articles = 'articles',
  Information = 'information',
  Loksewa = 'loksewa',
  Scholarships = 'scholarships'
}

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getCategory: Category;
  getComments: CommentConnection;
  getLoksewaCategories: Array<LoksewaQuestionCategory>;
  getLoksewaMockCategories: Array<LoksewaMockCategory>;
  getMeNotification: Array<Notification>;
  getMeReaction?: Maybe<Reaction>;
  getMockCategory: LoksewaMockCategory;
  getMockSet: LoksewaMockSet;
  getMockSets: Array<LoksewaMockSet>;
  getPost?: Maybe<Post>;
  getPostFromSlug?: Maybe<Post>;
  getPosts: PostConnection;
  getQuestions: LoksewaQuestionConnection;
  getTag: Category;
  getTags: TagConnection;
  getUsers: UserConnection;
  me?: Maybe<User>;
};


export type QueryGetCategoryArgs = {
  id: Scalars['String'];
};


export type QueryGetCommentsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  postId: Scalars['String'];
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetMeReactionArgs = {
  postId: Scalars['String'];
};


export type QueryGetMockCategoryArgs = {
  categoryId: Scalars['String'];
};


export type QueryGetMockSetArgs = {
  setId: Scalars['String'];
};


export type QueryGetMockSetsArgs = {
  categoryId: Scalars['String'];
};


export type QueryGetPostArgs = {
  id: Scalars['String'];
};


export type QueryGetPostFromSlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetPostsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  editorId?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  status?: Maybe<PostStatus>;
  subCategoryId?: Maybe<Scalars['String']>;
  type?: Maybe<PostType>;
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetQuestionsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetTagArgs = {
  id: Scalars['String'];
};


export type QueryGetTagsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetUsersArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  roles?: Maybe<Array<Maybe<UserRole>>>;
  skip?: Maybe<Scalars['Int']>;
};

/** Major Category for Post */
export type Reaction = {
  __typename?: 'Reaction';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  post: Post;
  postId: Scalars['String'];
  type: ReactionType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export enum ReactionType {
  Angry = 'angry',
  Dislike = 'dislike',
  Happy = 'happy',
  Like = 'like',
  Sad = 'sad'
}

export type Scholarship = {
  __typename?: 'Scholarship';
  country: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  deadlineAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  level: ScholarshipLevel;
  post: Post;
  postId: Scalars['String'];
  startsAt: Scalars['Date'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export enum ScholarshipLevel {
  Bachelors = 'bachelors',
  K12 = 'k12',
  Language = 'language',
  Masters = 'masters',
  Phd = 'phd',
  Postgrad = 'postgrad',
  Research = 'research',
  Training = 'training'
}

export type Session = {
  __typename?: 'Session';
  authToken: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  expires: Scalars['Date'];
  facebookToken?: Maybe<Scalars['String']>;
  githubToken?: Maybe<Scalars['String']>;
  googleToken?: Maybe<Scalars['String']>;
  /** Unique UUID string */
  id: Scalars['ID'];
  invalidate: Scalars['Boolean'];
  refreshToken: Scalars['String'];
  token: Scalars['String'];
  type: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
};

/** Sub Category for Post */
export type SubCategory = {
  __typename?: 'SubCategory';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<Category>;
  parentId?: Maybe<Scalars['String']>;
  posts: Array<Post>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  email: Scalars['Boolean'];
  /** Unique UUID string */
  id: Scalars['ID'];
  postType: Array<PostType>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user: User;
  userId: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  /** Unique UUID string */
  id: Scalars['ID'];
  name: Scalars['String'];
  post?: Maybe<Array<Post>>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type TagConnection = {
  __typename?: 'TagConnection';
  edges?: Maybe<Array<TagEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TagEdge = {
  __typename?: 'TagEdge';
  cursor: Scalars['String'];
  node: Tag;
};

export type UpdateCategoryInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  parentType?: Maybe<PostType>;
};

export type UpdateCommentInput = {
  body?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  parentId?: Maybe<Scalars['String']>;
  postId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UpdateLoksewaMockCategoryInput = {
  id: Scalars['String'];
  negativeMarkingRatio?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  titleNP?: Maybe<Scalars['String']>;
  totalMins?: Maybe<Scalars['Int']>;
};

export type UpdateLoksewaMockSetInput = {
  /** Category for Mock */
  categoryId?: Maybe<Scalars['String']>;
  editorId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  status: MockSetStatus;
  type: MockSetType;
};

export type UpdateLoksewaQuestionCategoryInput = {
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  titleNP?: Maybe<Scalars['String']>;
};

export type UpdateLoksewaQuestionInput = {
  additionalDetails?: Maybe<Scalars['String']>;
  answer: McqAnswer;
  categoryId?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  edgeId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  metaId?: Maybe<Scalars['String']>;
  optionA?: Maybe<Scalars['String']>;
  optionB?: Maybe<Scalars['String']>;
  optionC?: Maybe<Scalars['String']>;
  optionD?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type UpdatePostInput = {
  body?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  excerpt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imageId?: Maybe<Scalars['String']>;
  language?: Maybe<Language>;
  slug?: Maybe<Scalars['String']>;
  status?: Maybe<PostStatus>;
  subCategoryId?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
  type?: Maybe<PostType>;
  url?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UpdateSetQuestionInput = {
  additionalDetails?: Maybe<Scalars['String']>;
  answer: McqAnswer;
  categoryId?: Maybe<Scalars['String']>;
  difficulty?: Maybe<Difficulty>;
  id: Scalars['String'];
  metaId?: Maybe<Scalars['String']>;
  optionA?: Maybe<Scalars['String']>;
  optionB?: Maybe<Scalars['String']>;
  optionC?: Maybe<Scalars['String']>;
  optionD?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  questionId: Scalars['String'];
  setId: Scalars['String'];
  title: Scalars['String'];
  weight: Scalars['Int'];
};

export type UpdateSubCategoryInput = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['String']>;
};


/** User Model */
export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  comments?: Maybe<Comment>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  deleted: Scalars['Boolean'];
  displayName?: Maybe<Scalars['String']>;
  editedLoksewaMockSet?: Maybe<Array<LoksewaMockSet>>;
  editedPosts?: Maybe<Array<Post>>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  flag: Array<Flag>;
  followers?: Maybe<Array<Follow>>;
  following?: Maybe<Array<Follow>>;
  /** Unique UUID string */
  id: Scalars['ID'];
  image?: Maybe<File>;
  lastName?: Maybe<Scalars['String']>;
  loksewaTest?: Maybe<Array<LoksewaTest>>;
  membership?: Maybe<Membership>;
  middleName?: Maybe<Scalars['String']>;
  moderatorFlag?: Maybe<Array<Flag>>;
  notifications: Array<Notification>;
  orders?: Maybe<Array<Order>>;
  posts?: Maybe<Array<Post>>;
  reactions?: Maybe<Array<Reaction>>;
  role: UserRole;
  session: Array<Session>;
  status: UserStatus;
  subcription?: Maybe<Subscription>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<UserEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};

export enum UserRole {
  Admin = 'admin',
  Moderator = 'moderator',
  User = 'user'
}

export enum UserStatus {
  Active = 'active',
  Blocked = 'blocked',
  Inactive = 'inactive'
}

export type SendMagicLinkMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendMagicLinkMutation = (
  { __typename?: 'Mutation' }
  & { sendMagicLink: (
    { __typename?: 'MagicLink' }
    & Pick<MagicLink, 'status' | 'listener'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type CreatePostMutationVariables = Exact<{
  post: CreatePostInput;
  scholarship?: Maybe<CreateScholarshipInput>;
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  ) }
);

export type CreateMePostMutationVariables = Exact<{
  post: CreatePostInput;
}>;


export type CreateMePostMutation = (
  { __typename?: 'Mutation' }
  & { createMePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  ) }
);

export type UpdateMePostMutationVariables = Exact<{
  post: UpdatePostInput;
}>;


export type UpdateMePostMutation = (
  { __typename?: 'Mutation' }
  & { updateMePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  post: UpdatePostInput;
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id'>
  ) }
);

export type CreateTagMutationVariables = Exact<{
  tag: CreateTagInput;
}>;


export type CreateTagMutation = (
  { __typename?: 'Mutation' }
  & { createTag: (
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  ) }
);

export type CreateCategoryMutationVariables = Exact<{
  category: CreateCategoryInput;
}>;


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory: (
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  ) }
);

export type CreateSubCategoryMutationVariables = Exact<{
  subCategory: CreateSubCategoryInput;
}>;


export type CreateSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createSubCategory: (
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  ) }
);

export type UpdateCategoryMutationVariables = Exact<{
  category: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateCategory: (
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  ) }
);

export type UpdateSubCategoryMutationVariables = Exact<{
  subCategory: UpdateSubCategoryInput;
}>;


export type UpdateSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateSubCategory: (
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  ) }
);

export type DeleteCategoryMutationVariables = Exact<{
  category: UpdateCategoryInput;
}>;


export type DeleteCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCategory'>
);

export type DeleteSubCategoryMutationVariables = Exact<{
  subCategory: UpdateSubCategoryInput;
}>;


export type DeleteSubCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSubCategory'>
);

export type CreateLoksewaCategoryMutationVariables = Exact<{
  category: CreateLoksewaQuestionCategoryInput;
}>;


export type CreateLoksewaCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createLoksewaCategory: (
    { __typename?: 'LoksewaQuestionCategory' }
    & Pick<LoksewaQuestionCategory, 'id' | 'title' | 'titleNP'>
  ) }
);

export type DeleteLoksewaCategoryMutationVariables = Exact<{
  category: UpdateLoksewaQuestionCategoryInput;
}>;


export type DeleteLoksewaCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLoksewaCategory'>
);

export type UpdateLoksewaCategoryMutationVariables = Exact<{
  category: UpdateLoksewaQuestionCategoryInput;
}>;


export type UpdateLoksewaCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateLoksewaCategory: (
    { __typename?: 'LoksewaQuestionCategory' }
    & Pick<LoksewaQuestionCategory, 'id' | 'title' | 'titleNP'>
  ) }
);

export type CreateLoksewaMockCategoryMutationVariables = Exact<{
  category: CreateLoksewaMockCategoryInput;
}>;


export type CreateLoksewaMockCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createLoksewaMockCategory: (
    { __typename?: 'LoksewaMockCategory' }
    & Pick<LoksewaMockCategory, 'id' | 'title' | 'titleNP'>
  ) }
);

export type DeleteLoksewaMockCategoryMutationVariables = Exact<{
  category: UpdateLoksewaMockCategoryInput;
}>;


export type DeleteLoksewaMockCategoryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteLoksewaMockCategory'>
);

export type UpdateLoksewaMockCategoryMutationVariables = Exact<{
  category: UpdateLoksewaMockCategoryInput;
}>;


export type UpdateLoksewaMockCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateLoksewaMockCategory: (
    { __typename?: 'LoksewaMockCategory' }
    & Pick<LoksewaMockCategory, 'id' | 'title' | 'titleNP'>
  ) }
);

export type CreateMockSetMutationVariables = Exact<{
  set: CreateLoksewaMockSetInput;
}>;


export type CreateMockSetMutation = (
  { __typename?: 'Mutation' }
  & { createMockSet: (
    { __typename?: 'LoksewaMockSet' }
    & Pick<LoksewaMockSet, 'id' | 'type' | 'status'>
    & { category?: Maybe<(
      { __typename?: 'LoksewaMockCategory' }
      & Pick<LoksewaMockCategory, 'id' | 'title' | 'titleNP'>
    )> }
  ) }
);

export type DeleteMockSetMutationVariables = Exact<{
  set: UpdateLoksewaMockSetInput;
}>;


export type DeleteMockSetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMockSet'>
);

export type UpdateMockSetMutationVariables = Exact<{
  set: UpdateLoksewaMockSetInput;
}>;


export type UpdateMockSetMutation = (
  { __typename?: 'Mutation' }
  & { updateMockSet: (
    { __typename?: 'LoksewaMockSet' }
    & Pick<LoksewaMockSet, 'id' | 'type' | 'status'>
    & { category?: Maybe<(
      { __typename?: 'LoksewaMockCategory' }
      & Pick<LoksewaMockCategory, 'id' | 'title' | 'titleNP'>
    )> }
  ) }
);

export type CreateQuestionMutationVariables = Exact<{
  question: CreateLoksewaQuestionInput;
}>;


export type CreateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { createQuestion: (
    { __typename?: 'LoksewaQuestion' }
    & Pick<LoksewaQuestion, 'id'>
  ) }
);

export type UpdateQuestionMutationVariables = Exact<{
  question: UpdateLoksewaQuestionInput;
}>;


export type UpdateQuestionMutation = (
  { __typename?: 'Mutation' }
  & { updateQuestion: (
    { __typename?: 'LoksewaQuestion' }
    & Pick<LoksewaQuestion, 'id'>
  ) }
);

export type CreateSetQuestionMutationVariables = Exact<{
  question: CreateSetQuestionInput;
}>;


export type CreateSetQuestionMutation = (
  { __typename?: 'Mutation' }
  & { createSetQuestion: (
    { __typename?: 'MockQuestionEdge' }
    & Pick<MockQuestionEdge, 'id'>
  ) }
);

export type UpdateSetQuestionMutationVariables = Exact<{
  question: UpdateSetQuestionInput;
}>;


export type UpdateSetQuestionMutation = (
  { __typename?: 'Mutation' }
  & { updateSetQuestion: (
    { __typename?: 'MockQuestionEdge' }
    & Pick<MockQuestionEdge, 'id'>
  ) }
);

export type CreateAssetMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type CreateAssetMutation = (
  { __typename?: 'Mutation' }
  & { createAsset: (
    { __typename?: 'File' }
    & Pick<File, 'id'>
  ) }
);

export type CreateAssetOnServerMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type CreateAssetOnServerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createAssetOnServer'>
);

export type CreateMeCommentMutationVariables = Exact<{
  comment: CreateCommentInput;
}>;


export type CreateMeCommentMutation = (
  { __typename?: 'Mutation' }
  & { createMeComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'body'>
  ) }
);

export type UpdateMeCommentMutationVariables = Exact<{
  comment: UpdateCommentInput;
}>;


export type UpdateMeCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateMeComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'body'>
  ) }
);

export type DeleteMeCommentMutationVariables = Exact<{
  comment: UpdateCommentInput;
}>;


export type DeleteMeCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMeComment'>
);

export type UpdateMeNotificationMutationVariables = Exact<{
  notificationId: Scalars['String'];
}>;


export type UpdateMeNotificationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateMeNotification'>
);

export type ReactToPostMutationVariables = Exact<{
  reaction: CreateReactionInput;
}>;


export type ReactToPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'reactToPost'>
);

export type GetPostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'userId' | 'title' | 'body' | 'categoryId' | 'subCategoryId' | 'language' | 'status'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name'>
    )> }
  )> }
);

export type GetPostFromSlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetPostFromSlugQuery = (
  { __typename?: 'Query' }
  & { getPostFromSlug?: Maybe<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'publishedAt' | 'body' | 'title' | 'language' | 'userId' | 'deleted' | 'status'>
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'createdAt' | 'body'>
      & { children?: Maybe<Array<(
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'createdAt' | 'body'>
      )>>, user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'firstName' | 'middleName' | 'lastName' | 'displayName' | 'bio' | 'status' | 'role' | 'deleted'>
        & { image?: Maybe<(
          { __typename?: 'File' }
          & Pick<File, 'preview'>
        )> }
      )> }
    )>, reactions?: Maybe<Array<(
      { __typename?: 'Reaction' }
      & Pick<Reaction, 'type' | 'userId'>
    )>>, tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Tag, 'id' | 'name'>
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'middleName' | 'lastName' | 'displayName' | 'bio' | 'status' | 'role' | 'deleted'>
      & { image?: Maybe<(
        { __typename?: 'File' }
        & Pick<File, 'preview'>
      )> }
    )> }
  )> }
);

export type GetPostsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  contains?: Maybe<Scalars['String']>;
  status?: Maybe<PostStatus>;
  type?: Maybe<PostType>;
  categoryId?: Maybe<Scalars['String']>;
  subCategoryId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  editorId?: Maybe<Scalars['String']>;
}>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: (
    { __typename?: 'PostConnection' }
    & Pick<PostConnection, 'totalCount'>
    & { edges?: Maybe<Array<(
      { __typename?: 'PostEdge' }
      & { node: (
        { __typename?: 'Post' }
        & Pick<Post, 'id' | 'views' | 'slug' | 'title' | 'excerpt' | 'body' | 'categoryId' | 'subCategoryId' | 'language' | 'status'>
        & { user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'displayName' | 'email' | 'firstName' | 'middleName' | 'lastName'>
          & { image?: Maybe<(
            { __typename?: 'File' }
            & Pick<File, 'id' | 'preview'>
          )> }
        )>, flag?: Maybe<Array<Maybe<(
          { __typename?: 'Flag' }
          & Pick<Flag, 'id'>
        )>>>, editor?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'displayName'>
        )>, tags: Array<(
          { __typename?: 'Tag' }
          & Pick<Tag, 'id' | 'name'>
        )>, reactions?: Maybe<Array<(
          { __typename?: 'Reaction' }
          & Pick<Reaction, 'type' | 'userId'>
        )>> }
      ) }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'>
    ) }
  ) }
);

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'parentType'>
  )> }
);

export type GetCategoriesWithSubCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesWithSubCategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'parentType'>
    & { subCategories: Array<(
      { __typename?: 'SubCategory' }
      & Pick<SubCategory, 'id' | 'name'>
    )> }
  )> }
);

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetCategoryQuery = (
  { __typename?: 'Query' }
  & { getCategory: (
    { __typename?: 'Category' }
    & Pick<Category, 'name' | 'parentType'>
    & { subCategories: Array<(
      { __typename?: 'SubCategory' }
      & Pick<SubCategory, 'id' | 'name'>
    )> }
  ) }
);

export type GetUsersQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  contains?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Maybe<UserRole>> | Maybe<UserRole>>;
}>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { getUsers: (
    { __typename?: 'UserConnection' }
    & { edges?: Maybe<Array<(
      { __typename?: 'UserEdge' }
      & { node: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName' | 'displayName' | 'email' | 'deleted' | 'status'>
        & { image?: Maybe<(
          { __typename?: 'File' }
          & Pick<File, 'id' | 'source' | 'preview'>
        )> }
      ) }
    )>> }
  ) }
);

export type GetQuestionsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  categoryId?: Maybe<Scalars['String']>;
}>;


export type GetQuestionsQuery = (
  { __typename?: 'Query' }
  & { getQuestions: (
    { __typename?: 'LoksewaQuestionConnection' }
    & Pick<LoksewaQuestionConnection, 'totalCount'>
    & { edges?: Maybe<Array<(
      { __typename?: 'LoksewaQuestionEdge' }
      & { node: (
        { __typename?: 'LoksewaQuestion' }
        & Pick<LoksewaQuestion, 'id' | 'title' | 'optionA' | 'optionB' | 'optionC' | 'optionD' | 'answer' | 'additionalDetails'>
      ) }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'>
    ) }
  ) }
);

export type GetTagsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  contains?: Maybe<Scalars['String']>;
}>;


export type GetTagsQuery = (
  { __typename?: 'Query' }
  & { getTags: (
    { __typename?: 'TagConnection' }
    & { edges?: Maybe<Array<(
      { __typename?: 'TagEdge' }
      & { node: (
        { __typename?: 'Tag' }
        & Pick<Tag, 'id' | 'name'>
      ) }
    )>> }
  ) }
);

export type GetLoksewaCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoksewaCategoriesQuery = (
  { __typename?: 'Query' }
  & { getLoksewaCategories: Array<(
    { __typename?: 'LoksewaQuestionCategory' }
    & Pick<LoksewaQuestionCategory, 'id' | 'title' | 'titleNP'>
  )> }
);

export type GetLoksewaMockCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoksewaMockCategoriesQuery = (
  { __typename?: 'Query' }
  & { getLoksewaMockCategories: Array<(
    { __typename?: 'LoksewaMockCategory' }
    & Pick<LoksewaMockCategory, 'id' | 'title' | 'titleNP' | 'negativeMarkingRatio' | 'totalMins'>
  )> }
);

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'middleName' | 'displayName' | 'role' | 'email' | 'status'>
    & { image?: Maybe<(
      { __typename?: 'File' }
      & Pick<File, 'id' | 'source' | 'preview'>
    )> }
  )> }
);

export type GetMockSetsQueryVariables = Exact<{
  categoryId: Scalars['String'];
}>;


export type GetMockSetsQuery = (
  { __typename?: 'Query' }
  & { getMockSets: Array<(
    { __typename?: 'LoksewaMockSet' }
    & Pick<LoksewaMockSet, 'id' | 'type' | 'status'>
  )> }
);

export type GetMockCategoryQueryVariables = Exact<{
  categoryId: Scalars['String'];
}>;


export type GetMockCategoryQuery = (
  { __typename?: 'Query' }
  & { getMockCategory: (
    { __typename?: 'LoksewaMockCategory' }
    & Pick<LoksewaMockCategory, 'id' | 'title' | 'titleNP'>
  ) }
);

export type GetMockSetQueryVariables = Exact<{
  setId: Scalars['String'];
}>;


export type GetMockSetQuery = (
  { __typename?: 'Query' }
  & { getMockSet: (
    { __typename?: 'LoksewaMockSet' }
    & { category?: Maybe<(
      { __typename?: 'LoksewaMockCategory' }
      & Pick<LoksewaMockCategory, 'id' | 'negativeMarkingRatio' | 'totalMins' | 'title' | 'titleNP'>
    )>, questions: Array<(
      { __typename?: 'MockQuestionEdge' }
      & Pick<MockQuestionEdge, 'order' | 'weight'>
      & { question: (
        { __typename?: 'LoksewaQuestion' }
        & Pick<LoksewaQuestion, 'title' | 'optionA' | 'optionB' | 'optionC' | 'optionD'>
      ) }
    )> }
  ) }
);

export type GetCommentsQueryVariables = Exact<{
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  postId: Scalars['String'];
}>;


export type GetCommentsQuery = (
  { __typename?: 'Query' }
  & { getComments: (
    { __typename?: 'CommentConnection' }
    & { edges?: Maybe<Array<(
      { __typename?: 'CommentEdge' }
      & { node: (
        { __typename?: 'Comment' }
        & Pick<Comment, 'id' | 'createdAt' | 'body'>
        & { children?: Maybe<Array<(
          { __typename?: 'Comment' }
          & Pick<Comment, 'id' | 'createdAt' | 'body'>
          & { user?: Maybe<(
            { __typename?: 'User' }
            & Pick<User, 'id' | 'displayName'>
            & { image?: Maybe<(
              { __typename?: 'File' }
              & Pick<File, 'preview'>
            )> }
          )> }
        )>>, user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'displayName'>
          & { image?: Maybe<(
            { __typename?: 'File' }
            & Pick<File, 'preview'>
          )> }
        )> }
      ) }
    )>> }
  ) }
);

export type GetMeNotificationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeNotificationQuery = (
  { __typename?: 'Query' }
  & { getMeNotification: Array<(
    { __typename?: 'Notification' }
    & Pick<Notification, 'id' | 'body' | 'url' | 'read'>
  )> }
);

export type GetMeReactionQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type GetMeReactionQuery = (
  { __typename?: 'Query' }
  & { getMeReaction?: Maybe<(
    { __typename?: 'Reaction' }
    & Pick<Reaction, 'type'>
  )> }
);


export const SendMagicLinkDocument = gql`
    mutation sendMagicLink($email: String!) {
  sendMagicLink(email: $email) {
    status
    listener
  }
}
    `;
export type SendMagicLinkMutationFn = Apollo.MutationFunction<SendMagicLinkMutation, SendMagicLinkMutationVariables>;

/**
 * __useSendMagicLinkMutation__
 *
 * To run a mutation, you first call `useSendMagicLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMagicLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMagicLinkMutation, { data, loading, error }] = useSendMagicLinkMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendMagicLinkMutation(baseOptions?: Apollo.MutationHookOptions<SendMagicLinkMutation, SendMagicLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMagicLinkMutation, SendMagicLinkMutationVariables>(SendMagicLinkDocument, options);
      }
export type SendMagicLinkMutationHookResult = ReturnType<typeof useSendMagicLinkMutation>;
export type SendMagicLinkMutationResult = Apollo.MutationResult<SendMagicLinkMutation>;
export type SendMagicLinkMutationOptions = Apollo.BaseMutationOptions<SendMagicLinkMutation, SendMagicLinkMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($user: CreateUserInput!) {
  createUser(user: $user) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($post: CreatePostInput!, $scholarship: CreateScholarshipInput) {
  createPost(post: $post, scholarship: $scholarship) {
    id
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      post: // value for 'post'
 *      scholarship: // value for 'scholarship'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateMePostDocument = gql`
    mutation createMePost($post: CreatePostInput!) {
  createMePost(post: $post) {
    id
  }
}
    `;
export type CreateMePostMutationFn = Apollo.MutationFunction<CreateMePostMutation, CreateMePostMutationVariables>;

/**
 * __useCreateMePostMutation__
 *
 * To run a mutation, you first call `useCreateMePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMePostMutation, { data, loading, error }] = useCreateMePostMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useCreateMePostMutation(baseOptions?: Apollo.MutationHookOptions<CreateMePostMutation, CreateMePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMePostMutation, CreateMePostMutationVariables>(CreateMePostDocument, options);
      }
export type CreateMePostMutationHookResult = ReturnType<typeof useCreateMePostMutation>;
export type CreateMePostMutationResult = Apollo.MutationResult<CreateMePostMutation>;
export type CreateMePostMutationOptions = Apollo.BaseMutationOptions<CreateMePostMutation, CreateMePostMutationVariables>;
export const UpdateMePostDocument = gql`
    mutation updateMePost($post: UpdatePostInput!) {
  updateMePost(post: $post) {
    id
  }
}
    `;
export type UpdateMePostMutationFn = Apollo.MutationFunction<UpdateMePostMutation, UpdateMePostMutationVariables>;

/**
 * __useUpdateMePostMutation__
 *
 * To run a mutation, you first call `useUpdateMePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMePostMutation, { data, loading, error }] = useUpdateMePostMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useUpdateMePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMePostMutation, UpdateMePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMePostMutation, UpdateMePostMutationVariables>(UpdateMePostDocument, options);
      }
export type UpdateMePostMutationHookResult = ReturnType<typeof useUpdateMePostMutation>;
export type UpdateMePostMutationResult = Apollo.MutationResult<UpdateMePostMutation>;
export type UpdateMePostMutationOptions = Apollo.BaseMutationOptions<UpdateMePostMutation, UpdateMePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($post: UpdatePostInput!) {
  updatePost(post: $post) {
    id
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      post: // value for 'post'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CreateTagDocument = gql`
    mutation createTag($tag: CreateTagInput!) {
  createTag(tag: $tag) {
    id
    name
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($category: CreateCategoryInput!) {
  createCategory(category: $category) {
    id
    name
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateSubCategoryDocument = gql`
    mutation createSubCategory($subCategory: CreateSubCategoryInput!) {
  createSubCategory(subCategory: $subCategory) {
    id
    name
  }
}
    `;
export type CreateSubCategoryMutationFn = Apollo.MutationFunction<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>;

/**
 * __useCreateSubCategoryMutation__
 *
 * To run a mutation, you first call `useCreateSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSubCategoryMutation, { data, loading, error }] = useCreateSubCategoryMutation({
 *   variables: {
 *      subCategory: // value for 'subCategory'
 *   },
 * });
 */
export function useCreateSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>(CreateSubCategoryDocument, options);
      }
export type CreateSubCategoryMutationHookResult = ReturnType<typeof useCreateSubCategoryMutation>;
export type CreateSubCategoryMutationResult = Apollo.MutationResult<CreateSubCategoryMutation>;
export type CreateSubCategoryMutationOptions = Apollo.BaseMutationOptions<CreateSubCategoryMutation, CreateSubCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation updateCategory($category: UpdateCategoryInput!) {
  updateCategory(category: $category) {
    id
    name
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const UpdateSubCategoryDocument = gql`
    mutation updateSubCategory($subCategory: UpdateSubCategoryInput!) {
  updateSubCategory(subCategory: $subCategory) {
    id
    name
  }
}
    `;
export type UpdateSubCategoryMutationFn = Apollo.MutationFunction<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>;

/**
 * __useUpdateSubCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSubCategoryMutation, { data, loading, error }] = useUpdateSubCategoryMutation({
 *   variables: {
 *      subCategory: // value for 'subCategory'
 *   },
 * });
 */
export function useUpdateSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>(UpdateSubCategoryDocument, options);
      }
export type UpdateSubCategoryMutationHookResult = ReturnType<typeof useUpdateSubCategoryMutation>;
export type UpdateSubCategoryMutationResult = Apollo.MutationResult<UpdateSubCategoryMutation>;
export type UpdateSubCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateSubCategoryMutation, UpdateSubCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation deleteCategory($category: UpdateCategoryInput!) {
  deleteCategory(category: $category)
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const DeleteSubCategoryDocument = gql`
    mutation deleteSubCategory($subCategory: UpdateSubCategoryInput!) {
  deleteSubCategory(subCategory: $subCategory)
}
    `;
export type DeleteSubCategoryMutationFn = Apollo.MutationFunction<DeleteSubCategoryMutation, DeleteSubCategoryMutationVariables>;

/**
 * __useDeleteSubCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteSubCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSubCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSubCategoryMutation, { data, loading, error }] = useDeleteSubCategoryMutation({
 *   variables: {
 *      subCategory: // value for 'subCategory'
 *   },
 * });
 */
export function useDeleteSubCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSubCategoryMutation, DeleteSubCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSubCategoryMutation, DeleteSubCategoryMutationVariables>(DeleteSubCategoryDocument, options);
      }
export type DeleteSubCategoryMutationHookResult = ReturnType<typeof useDeleteSubCategoryMutation>;
export type DeleteSubCategoryMutationResult = Apollo.MutationResult<DeleteSubCategoryMutation>;
export type DeleteSubCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteSubCategoryMutation, DeleteSubCategoryMutationVariables>;
export const CreateLoksewaCategoryDocument = gql`
    mutation createLoksewaCategory($category: CreateLoksewaQuestionCategoryInput!) {
  createLoksewaCategory(category: $category) {
    id
    title
    titleNP
  }
}
    `;
export type CreateLoksewaCategoryMutationFn = Apollo.MutationFunction<CreateLoksewaCategoryMutation, CreateLoksewaCategoryMutationVariables>;

/**
 * __useCreateLoksewaCategoryMutation__
 *
 * To run a mutation, you first call `useCreateLoksewaCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLoksewaCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLoksewaCategoryMutation, { data, loading, error }] = useCreateLoksewaCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateLoksewaCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateLoksewaCategoryMutation, CreateLoksewaCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLoksewaCategoryMutation, CreateLoksewaCategoryMutationVariables>(CreateLoksewaCategoryDocument, options);
      }
export type CreateLoksewaCategoryMutationHookResult = ReturnType<typeof useCreateLoksewaCategoryMutation>;
export type CreateLoksewaCategoryMutationResult = Apollo.MutationResult<CreateLoksewaCategoryMutation>;
export type CreateLoksewaCategoryMutationOptions = Apollo.BaseMutationOptions<CreateLoksewaCategoryMutation, CreateLoksewaCategoryMutationVariables>;
export const DeleteLoksewaCategoryDocument = gql`
    mutation deleteLoksewaCategory($category: UpdateLoksewaQuestionCategoryInput!) {
  deleteLoksewaCategory(category: $category)
}
    `;
export type DeleteLoksewaCategoryMutationFn = Apollo.MutationFunction<DeleteLoksewaCategoryMutation, DeleteLoksewaCategoryMutationVariables>;

/**
 * __useDeleteLoksewaCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteLoksewaCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLoksewaCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLoksewaCategoryMutation, { data, loading, error }] = useDeleteLoksewaCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useDeleteLoksewaCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLoksewaCategoryMutation, DeleteLoksewaCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLoksewaCategoryMutation, DeleteLoksewaCategoryMutationVariables>(DeleteLoksewaCategoryDocument, options);
      }
export type DeleteLoksewaCategoryMutationHookResult = ReturnType<typeof useDeleteLoksewaCategoryMutation>;
export type DeleteLoksewaCategoryMutationResult = Apollo.MutationResult<DeleteLoksewaCategoryMutation>;
export type DeleteLoksewaCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteLoksewaCategoryMutation, DeleteLoksewaCategoryMutationVariables>;
export const UpdateLoksewaCategoryDocument = gql`
    mutation updateLoksewaCategory($category: UpdateLoksewaQuestionCategoryInput!) {
  updateLoksewaCategory(category: $category) {
    id
    title
    titleNP
  }
}
    `;
export type UpdateLoksewaCategoryMutationFn = Apollo.MutationFunction<UpdateLoksewaCategoryMutation, UpdateLoksewaCategoryMutationVariables>;

/**
 * __useUpdateLoksewaCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateLoksewaCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLoksewaCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLoksewaCategoryMutation, { data, loading, error }] = useUpdateLoksewaCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useUpdateLoksewaCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLoksewaCategoryMutation, UpdateLoksewaCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLoksewaCategoryMutation, UpdateLoksewaCategoryMutationVariables>(UpdateLoksewaCategoryDocument, options);
      }
export type UpdateLoksewaCategoryMutationHookResult = ReturnType<typeof useUpdateLoksewaCategoryMutation>;
export type UpdateLoksewaCategoryMutationResult = Apollo.MutationResult<UpdateLoksewaCategoryMutation>;
export type UpdateLoksewaCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateLoksewaCategoryMutation, UpdateLoksewaCategoryMutationVariables>;
export const CreateLoksewaMockCategoryDocument = gql`
    mutation createLoksewaMockCategory($category: CreateLoksewaMockCategoryInput!) {
  createLoksewaMockCategory(category: $category) {
    id
    title
    titleNP
  }
}
    `;
export type CreateLoksewaMockCategoryMutationFn = Apollo.MutationFunction<CreateLoksewaMockCategoryMutation, CreateLoksewaMockCategoryMutationVariables>;

/**
 * __useCreateLoksewaMockCategoryMutation__
 *
 * To run a mutation, you first call `useCreateLoksewaMockCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLoksewaMockCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLoksewaMockCategoryMutation, { data, loading, error }] = useCreateLoksewaMockCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateLoksewaMockCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateLoksewaMockCategoryMutation, CreateLoksewaMockCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLoksewaMockCategoryMutation, CreateLoksewaMockCategoryMutationVariables>(CreateLoksewaMockCategoryDocument, options);
      }
export type CreateLoksewaMockCategoryMutationHookResult = ReturnType<typeof useCreateLoksewaMockCategoryMutation>;
export type CreateLoksewaMockCategoryMutationResult = Apollo.MutationResult<CreateLoksewaMockCategoryMutation>;
export type CreateLoksewaMockCategoryMutationOptions = Apollo.BaseMutationOptions<CreateLoksewaMockCategoryMutation, CreateLoksewaMockCategoryMutationVariables>;
export const DeleteLoksewaMockCategoryDocument = gql`
    mutation deleteLoksewaMockCategory($category: UpdateLoksewaMockCategoryInput!) {
  deleteLoksewaMockCategory(category: $category)
}
    `;
export type DeleteLoksewaMockCategoryMutationFn = Apollo.MutationFunction<DeleteLoksewaMockCategoryMutation, DeleteLoksewaMockCategoryMutationVariables>;

/**
 * __useDeleteLoksewaMockCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteLoksewaMockCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLoksewaMockCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLoksewaMockCategoryMutation, { data, loading, error }] = useDeleteLoksewaMockCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useDeleteLoksewaMockCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLoksewaMockCategoryMutation, DeleteLoksewaMockCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLoksewaMockCategoryMutation, DeleteLoksewaMockCategoryMutationVariables>(DeleteLoksewaMockCategoryDocument, options);
      }
export type DeleteLoksewaMockCategoryMutationHookResult = ReturnType<typeof useDeleteLoksewaMockCategoryMutation>;
export type DeleteLoksewaMockCategoryMutationResult = Apollo.MutationResult<DeleteLoksewaMockCategoryMutation>;
export type DeleteLoksewaMockCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteLoksewaMockCategoryMutation, DeleteLoksewaMockCategoryMutationVariables>;
export const UpdateLoksewaMockCategoryDocument = gql`
    mutation updateLoksewaMockCategory($category: UpdateLoksewaMockCategoryInput!) {
  updateLoksewaMockCategory(category: $category) {
    id
    title
    titleNP
  }
}
    `;
export type UpdateLoksewaMockCategoryMutationFn = Apollo.MutationFunction<UpdateLoksewaMockCategoryMutation, UpdateLoksewaMockCategoryMutationVariables>;

/**
 * __useUpdateLoksewaMockCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateLoksewaMockCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLoksewaMockCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLoksewaMockCategoryMutation, { data, loading, error }] = useUpdateLoksewaMockCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useUpdateLoksewaMockCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLoksewaMockCategoryMutation, UpdateLoksewaMockCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLoksewaMockCategoryMutation, UpdateLoksewaMockCategoryMutationVariables>(UpdateLoksewaMockCategoryDocument, options);
      }
export type UpdateLoksewaMockCategoryMutationHookResult = ReturnType<typeof useUpdateLoksewaMockCategoryMutation>;
export type UpdateLoksewaMockCategoryMutationResult = Apollo.MutationResult<UpdateLoksewaMockCategoryMutation>;
export type UpdateLoksewaMockCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateLoksewaMockCategoryMutation, UpdateLoksewaMockCategoryMutationVariables>;
export const CreateMockSetDocument = gql`
    mutation createMockSet($set: CreateLoksewaMockSetInput!) {
  createMockSet(set: $set) {
    id
    type
    status
    category {
      id
      title
      titleNP
    }
  }
}
    `;
export type CreateMockSetMutationFn = Apollo.MutationFunction<CreateMockSetMutation, CreateMockSetMutationVariables>;

/**
 * __useCreateMockSetMutation__
 *
 * To run a mutation, you first call `useCreateMockSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMockSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMockSetMutation, { data, loading, error }] = useCreateMockSetMutation({
 *   variables: {
 *      set: // value for 'set'
 *   },
 * });
 */
export function useCreateMockSetMutation(baseOptions?: Apollo.MutationHookOptions<CreateMockSetMutation, CreateMockSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMockSetMutation, CreateMockSetMutationVariables>(CreateMockSetDocument, options);
      }
export type CreateMockSetMutationHookResult = ReturnType<typeof useCreateMockSetMutation>;
export type CreateMockSetMutationResult = Apollo.MutationResult<CreateMockSetMutation>;
export type CreateMockSetMutationOptions = Apollo.BaseMutationOptions<CreateMockSetMutation, CreateMockSetMutationVariables>;
export const DeleteMockSetDocument = gql`
    mutation deleteMockSet($set: UpdateLoksewaMockSetInput!) {
  deleteMockSet(set: $set)
}
    `;
export type DeleteMockSetMutationFn = Apollo.MutationFunction<DeleteMockSetMutation, DeleteMockSetMutationVariables>;

/**
 * __useDeleteMockSetMutation__
 *
 * To run a mutation, you first call `useDeleteMockSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMockSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMockSetMutation, { data, loading, error }] = useDeleteMockSetMutation({
 *   variables: {
 *      set: // value for 'set'
 *   },
 * });
 */
export function useDeleteMockSetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMockSetMutation, DeleteMockSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMockSetMutation, DeleteMockSetMutationVariables>(DeleteMockSetDocument, options);
      }
export type DeleteMockSetMutationHookResult = ReturnType<typeof useDeleteMockSetMutation>;
export type DeleteMockSetMutationResult = Apollo.MutationResult<DeleteMockSetMutation>;
export type DeleteMockSetMutationOptions = Apollo.BaseMutationOptions<DeleteMockSetMutation, DeleteMockSetMutationVariables>;
export const UpdateMockSetDocument = gql`
    mutation updateMockSet($set: UpdateLoksewaMockSetInput!) {
  updateMockSet(set: $set) {
    id
    type
    status
    category {
      id
      title
      titleNP
    }
  }
}
    `;
export type UpdateMockSetMutationFn = Apollo.MutationFunction<UpdateMockSetMutation, UpdateMockSetMutationVariables>;

/**
 * __useUpdateMockSetMutation__
 *
 * To run a mutation, you first call `useUpdateMockSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMockSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMockSetMutation, { data, loading, error }] = useUpdateMockSetMutation({
 *   variables: {
 *      set: // value for 'set'
 *   },
 * });
 */
export function useUpdateMockSetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMockSetMutation, UpdateMockSetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMockSetMutation, UpdateMockSetMutationVariables>(UpdateMockSetDocument, options);
      }
export type UpdateMockSetMutationHookResult = ReturnType<typeof useUpdateMockSetMutation>;
export type UpdateMockSetMutationResult = Apollo.MutationResult<UpdateMockSetMutation>;
export type UpdateMockSetMutationOptions = Apollo.BaseMutationOptions<UpdateMockSetMutation, UpdateMockSetMutationVariables>;
export const CreateQuestionDocument = gql`
    mutation createQuestion($question: CreateLoksewaQuestionInput!) {
  createQuestion(question: $question) {
    id
  }
}
    `;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;

/**
 * __useCreateQuestionMutation__
 *
 * To run a mutation, you first call `useCreateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuestionMutation, { data, loading, error }] = useCreateQuestionMutation({
 *   variables: {
 *      question: // value for 'question'
 *   },
 * });
 */
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, options);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;
export const UpdateQuestionDocument = gql`
    mutation updateQuestion($question: UpdateLoksewaQuestionInput!) {
  updateQuestion(question: $question) {
    id
  }
}
    `;
export type UpdateQuestionMutationFn = Apollo.MutationFunction<UpdateQuestionMutation, UpdateQuestionMutationVariables>;

/**
 * __useUpdateQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuestionMutation, { data, loading, error }] = useUpdateQuestionMutation({
 *   variables: {
 *      question: // value for 'question'
 *   },
 * });
 */
export function useUpdateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionMutation, UpdateQuestionMutationVariables>(UpdateQuestionDocument, options);
      }
export type UpdateQuestionMutationHookResult = ReturnType<typeof useUpdateQuestionMutation>;
export type UpdateQuestionMutationResult = Apollo.MutationResult<UpdateQuestionMutation>;
export type UpdateQuestionMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionMutation, UpdateQuestionMutationVariables>;
export const CreateSetQuestionDocument = gql`
    mutation createSetQuestion($question: CreateSetQuestionInput!) {
  createSetQuestion(question: $question) {
    id
  }
}
    `;
export type CreateSetQuestionMutationFn = Apollo.MutationFunction<CreateSetQuestionMutation, CreateSetQuestionMutationVariables>;

/**
 * __useCreateSetQuestionMutation__
 *
 * To run a mutation, you first call `useCreateSetQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSetQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSetQuestionMutation, { data, loading, error }] = useCreateSetQuestionMutation({
 *   variables: {
 *      question: // value for 'question'
 *   },
 * });
 */
export function useCreateSetQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSetQuestionMutation, CreateSetQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSetQuestionMutation, CreateSetQuestionMutationVariables>(CreateSetQuestionDocument, options);
      }
export type CreateSetQuestionMutationHookResult = ReturnType<typeof useCreateSetQuestionMutation>;
export type CreateSetQuestionMutationResult = Apollo.MutationResult<CreateSetQuestionMutation>;
export type CreateSetQuestionMutationOptions = Apollo.BaseMutationOptions<CreateSetQuestionMutation, CreateSetQuestionMutationVariables>;
export const UpdateSetQuestionDocument = gql`
    mutation updateSetQuestion($question: UpdateSetQuestionInput!) {
  updateSetQuestion(question: $question) {
    id
  }
}
    `;
export type UpdateSetQuestionMutationFn = Apollo.MutationFunction<UpdateSetQuestionMutation, UpdateSetQuestionMutationVariables>;

/**
 * __useUpdateSetQuestionMutation__
 *
 * To run a mutation, you first call `useUpdateSetQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSetQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSetQuestionMutation, { data, loading, error }] = useUpdateSetQuestionMutation({
 *   variables: {
 *      question: // value for 'question'
 *   },
 * });
 */
export function useUpdateSetQuestionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSetQuestionMutation, UpdateSetQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSetQuestionMutation, UpdateSetQuestionMutationVariables>(UpdateSetQuestionDocument, options);
      }
export type UpdateSetQuestionMutationHookResult = ReturnType<typeof useUpdateSetQuestionMutation>;
export type UpdateSetQuestionMutationResult = Apollo.MutationResult<UpdateSetQuestionMutation>;
export type UpdateSetQuestionMutationOptions = Apollo.BaseMutationOptions<UpdateSetQuestionMutation, UpdateSetQuestionMutationVariables>;
export const CreateAssetDocument = gql`
    mutation createAsset($file: Upload!) {
  createAsset(file: $file) {
    id
  }
}
    `;
export type CreateAssetMutationFn = Apollo.MutationFunction<CreateAssetMutation, CreateAssetMutationVariables>;

/**
 * __useCreateAssetMutation__
 *
 * To run a mutation, you first call `useCreateAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssetMutation, { data, loading, error }] = useCreateAssetMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useCreateAssetMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssetMutation, CreateAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssetMutation, CreateAssetMutationVariables>(CreateAssetDocument, options);
      }
export type CreateAssetMutationHookResult = ReturnType<typeof useCreateAssetMutation>;
export type CreateAssetMutationResult = Apollo.MutationResult<CreateAssetMutation>;
export type CreateAssetMutationOptions = Apollo.BaseMutationOptions<CreateAssetMutation, CreateAssetMutationVariables>;
export const CreateAssetOnServerDocument = gql`
    mutation createAssetOnServer($file: Upload!) {
  createAssetOnServer(file: $file)
}
    `;
export type CreateAssetOnServerMutationFn = Apollo.MutationFunction<CreateAssetOnServerMutation, CreateAssetOnServerMutationVariables>;

/**
 * __useCreateAssetOnServerMutation__
 *
 * To run a mutation, you first call `useCreateAssetOnServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssetOnServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssetOnServerMutation, { data, loading, error }] = useCreateAssetOnServerMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useCreateAssetOnServerMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssetOnServerMutation, CreateAssetOnServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssetOnServerMutation, CreateAssetOnServerMutationVariables>(CreateAssetOnServerDocument, options);
      }
export type CreateAssetOnServerMutationHookResult = ReturnType<typeof useCreateAssetOnServerMutation>;
export type CreateAssetOnServerMutationResult = Apollo.MutationResult<CreateAssetOnServerMutation>;
export type CreateAssetOnServerMutationOptions = Apollo.BaseMutationOptions<CreateAssetOnServerMutation, CreateAssetOnServerMutationVariables>;
export const CreateMeCommentDocument = gql`
    mutation createMeComment($comment: CreateCommentInput!) {
  createMeComment(comment: $comment) {
    id
    body
  }
}
    `;
export type CreateMeCommentMutationFn = Apollo.MutationFunction<CreateMeCommentMutation, CreateMeCommentMutationVariables>;

/**
 * __useCreateMeCommentMutation__
 *
 * To run a mutation, you first call `useCreateMeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMeCommentMutation, { data, loading, error }] = useCreateMeCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCreateMeCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateMeCommentMutation, CreateMeCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMeCommentMutation, CreateMeCommentMutationVariables>(CreateMeCommentDocument, options);
      }
export type CreateMeCommentMutationHookResult = ReturnType<typeof useCreateMeCommentMutation>;
export type CreateMeCommentMutationResult = Apollo.MutationResult<CreateMeCommentMutation>;
export type CreateMeCommentMutationOptions = Apollo.BaseMutationOptions<CreateMeCommentMutation, CreateMeCommentMutationVariables>;
export const UpdateMeCommentDocument = gql`
    mutation updateMeComment($comment: UpdateCommentInput!) {
  updateMeComment(comment: $comment) {
    id
    body
  }
}
    `;
export type UpdateMeCommentMutationFn = Apollo.MutationFunction<UpdateMeCommentMutation, UpdateMeCommentMutationVariables>;

/**
 * __useUpdateMeCommentMutation__
 *
 * To run a mutation, you first call `useUpdateMeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeCommentMutation, { data, loading, error }] = useUpdateMeCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useUpdateMeCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeCommentMutation, UpdateMeCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeCommentMutation, UpdateMeCommentMutationVariables>(UpdateMeCommentDocument, options);
      }
export type UpdateMeCommentMutationHookResult = ReturnType<typeof useUpdateMeCommentMutation>;
export type UpdateMeCommentMutationResult = Apollo.MutationResult<UpdateMeCommentMutation>;
export type UpdateMeCommentMutationOptions = Apollo.BaseMutationOptions<UpdateMeCommentMutation, UpdateMeCommentMutationVariables>;
export const DeleteMeCommentDocument = gql`
    mutation deleteMeComment($comment: UpdateCommentInput!) {
  deleteMeComment(comment: $comment)
}
    `;
export type DeleteMeCommentMutationFn = Apollo.MutationFunction<DeleteMeCommentMutation, DeleteMeCommentMutationVariables>;

/**
 * __useDeleteMeCommentMutation__
 *
 * To run a mutation, you first call `useDeleteMeCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMeCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMeCommentMutation, { data, loading, error }] = useDeleteMeCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useDeleteMeCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMeCommentMutation, DeleteMeCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMeCommentMutation, DeleteMeCommentMutationVariables>(DeleteMeCommentDocument, options);
      }
export type DeleteMeCommentMutationHookResult = ReturnType<typeof useDeleteMeCommentMutation>;
export type DeleteMeCommentMutationResult = Apollo.MutationResult<DeleteMeCommentMutation>;
export type DeleteMeCommentMutationOptions = Apollo.BaseMutationOptions<DeleteMeCommentMutation, DeleteMeCommentMutationVariables>;
export const UpdateMeNotificationDocument = gql`
    mutation updateMeNotification($notificationId: String!) {
  updateMeNotification(notificationId: $notificationId)
}
    `;
export type UpdateMeNotificationMutationFn = Apollo.MutationFunction<UpdateMeNotificationMutation, UpdateMeNotificationMutationVariables>;

/**
 * __useUpdateMeNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateMeNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeNotificationMutation, { data, loading, error }] = useUpdateMeNotificationMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useUpdateMeNotificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMeNotificationMutation, UpdateMeNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMeNotificationMutation, UpdateMeNotificationMutationVariables>(UpdateMeNotificationDocument, options);
      }
export type UpdateMeNotificationMutationHookResult = ReturnType<typeof useUpdateMeNotificationMutation>;
export type UpdateMeNotificationMutationResult = Apollo.MutationResult<UpdateMeNotificationMutation>;
export type UpdateMeNotificationMutationOptions = Apollo.BaseMutationOptions<UpdateMeNotificationMutation, UpdateMeNotificationMutationVariables>;
export const ReactToPostDocument = gql`
    mutation reactToPost($reaction: CreateReactionInput!) {
  reactToPost(reaction: $reaction)
}
    `;
export type ReactToPostMutationFn = Apollo.MutationFunction<ReactToPostMutation, ReactToPostMutationVariables>;

/**
 * __useReactToPostMutation__
 *
 * To run a mutation, you first call `useReactToPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactToPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactToPostMutation, { data, loading, error }] = useReactToPostMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *   },
 * });
 */
export function useReactToPostMutation(baseOptions?: Apollo.MutationHookOptions<ReactToPostMutation, ReactToPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReactToPostMutation, ReactToPostMutationVariables>(ReactToPostDocument, options);
      }
export type ReactToPostMutationHookResult = ReturnType<typeof useReactToPostMutation>;
export type ReactToPostMutationResult = Apollo.MutationResult<ReactToPostMutation>;
export type ReactToPostMutationOptions = Apollo.BaseMutationOptions<ReactToPostMutation, ReactToPostMutationVariables>;
export const GetPostDocument = gql`
    query getPost($id: String!) {
  getPost(id: $id) {
    userId
    title
    body
    categoryId
    subCategoryId
    language
    status
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostFromSlugDocument = gql`
    query getPostFromSlug($slug: String!) {
  getPostFromSlug(slug: $slug) {
    id
    publishedAt
    body
    title
    language
    userId
    deleted
    status
    comments {
      id
      createdAt
      body
      children {
        id
        createdAt
        body
      }
      user {
        id
        email
        firstName
        middleName
        lastName
        displayName
        bio
        status
        role
        deleted
        image {
          preview
        }
      }
    }
    reactions {
      type
      userId
    }
    tags {
      id
      name
    }
    user {
      id
      email
      firstName
      middleName
      lastName
      displayName
      bio
      status
      role
      deleted
      image {
        preview
      }
    }
  }
}
    `;

/**
 * __useGetPostFromSlugQuery__
 *
 * To run a query within a React component, call `useGetPostFromSlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostFromSlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostFromSlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetPostFromSlugQuery(baseOptions: Apollo.QueryHookOptions<GetPostFromSlugQuery, GetPostFromSlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostFromSlugQuery, GetPostFromSlugQueryVariables>(GetPostFromSlugDocument, options);
      }
export function useGetPostFromSlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostFromSlugQuery, GetPostFromSlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostFromSlugQuery, GetPostFromSlugQueryVariables>(GetPostFromSlugDocument, options);
        }
export type GetPostFromSlugQueryHookResult = ReturnType<typeof useGetPostFromSlugQuery>;
export type GetPostFromSlugLazyQueryHookResult = ReturnType<typeof useGetPostFromSlugLazyQuery>;
export type GetPostFromSlugQueryResult = Apollo.QueryResult<GetPostFromSlugQuery, GetPostFromSlugQueryVariables>;
export const GetPostsDocument = gql`
    query getPosts($after: String, $before: String, $first: Int, $last: Int, $skip: Int, $contains: String, $status: PostStatus, $type: PostType, $categoryId: String, $subCategoryId: String, $userId: String, $editorId: String) {
  getPosts(
    after: $after
    before: $before
    first: $first
    last: $last
    skip: $skip
    contains: $contains
    status: $status
    type: $type
    categoryId: $categoryId
    subCategoryId: $subCategoryId
    userId: $userId
    editorId: $editorId
  ) {
    edges {
      node {
        id
        user {
          id
          displayName
          email
          firstName
          middleName
          lastName
          image {
            id
            preview
          }
        }
        views
        flag {
          id
        }
        slug
        editor {
          id
          displayName
        }
        title
        excerpt
        body
        categoryId
        subCategoryId
        language
        status
        tags {
          id
          name
        }
        reactions {
          type
          userId
        }
      }
    }
    totalCount
    pageInfo {
      hasPreviousPage
      hasNextPage
      endCursor
      startCursor
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      skip: // value for 'skip'
 *      contains: // value for 'contains'
 *      status: // value for 'status'
 *      type: // value for 'type'
 *      categoryId: // value for 'categoryId'
 *      subCategoryId: // value for 'subCategoryId'
 *      userId: // value for 'userId'
 *      editorId: // value for 'editorId'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetCategoriesDocument = gql`
    query getCategories {
  getCategories {
    id
    name
    parentType
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoriesWithSubCategoriesDocument = gql`
    query getCategoriesWithSubCategories {
  getCategories {
    id
    name
    parentType
    subCategories {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCategoriesWithSubCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesWithSubCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesWithSubCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesWithSubCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesWithSubCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesWithSubCategoriesQuery, GetCategoriesWithSubCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesWithSubCategoriesQuery, GetCategoriesWithSubCategoriesQueryVariables>(GetCategoriesWithSubCategoriesDocument, options);
      }
export function useGetCategoriesWithSubCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesWithSubCategoriesQuery, GetCategoriesWithSubCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesWithSubCategoriesQuery, GetCategoriesWithSubCategoriesQueryVariables>(GetCategoriesWithSubCategoriesDocument, options);
        }
export type GetCategoriesWithSubCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesWithSubCategoriesQuery>;
export type GetCategoriesWithSubCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesWithSubCategoriesLazyQuery>;
export type GetCategoriesWithSubCategoriesQueryResult = Apollo.QueryResult<GetCategoriesWithSubCategoriesQuery, GetCategoriesWithSubCategoriesQueryVariables>;
export const GetCategoryDocument = gql`
    query getCategory($id: String!) {
  getCategory(id: $id) {
    name
    parentType
    subCategories {
      id
      name
    }
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers($after: String, $before: String, $first: Int, $last: Int, $skip: Int, $contains: String, $roles: [UserRole]) {
  getUsers(
    after: $after
    before: $before
    first: $first
    last: $last
    skip: $skip
    contains: $contains
    roles: $roles
  ) {
    edges {
      node {
        id
        firstName
        lastName
        displayName
        email
        deleted
        status
        image {
          id
          source
          preview
        }
      }
    }
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      skip: // value for 'skip'
 *      contains: // value for 'contains'
 *      roles: // value for 'roles'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetQuestionsDocument = gql`
    query getQuestions($after: String, $before: String, $first: Int, $last: Int, $skip: Int, $categoryId: String) {
  getQuestions(
    after: $after
    before: $before
    first: $first
    last: $last
    skip: $skip
    categoryId: $categoryId
  ) {
    edges {
      node {
        id
        title
        optionA
        optionB
        optionC
        optionD
        answer
        additionalDetails
      }
    }
    totalCount
    pageInfo {
      hasPreviousPage
      hasNextPage
      endCursor
      startCursor
    }
  }
}
    `;

/**
 * __useGetQuestionsQuery__
 *
 * To run a query within a React component, call `useGetQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuestionsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      skip: // value for 'skip'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetQuestionsQuery(baseOptions?: Apollo.QueryHookOptions<GetQuestionsQuery, GetQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetQuestionsQuery, GetQuestionsQueryVariables>(GetQuestionsDocument, options);
      }
export function useGetQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetQuestionsQuery, GetQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetQuestionsQuery, GetQuestionsQueryVariables>(GetQuestionsDocument, options);
        }
export type GetQuestionsQueryHookResult = ReturnType<typeof useGetQuestionsQuery>;
export type GetQuestionsLazyQueryHookResult = ReturnType<typeof useGetQuestionsLazyQuery>;
export type GetQuestionsQueryResult = Apollo.QueryResult<GetQuestionsQuery, GetQuestionsQueryVariables>;
export const GetTagsDocument = gql`
    query getTags($after: String, $before: String, $first: Int, $last: Int, $contains: String) {
  getTags(
    after: $after
    before: $before
    first: $first
    last: $last
    contains: $contains
  ) {
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      contains: // value for 'contains'
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const GetLoksewaCategoriesDocument = gql`
    query getLoksewaCategories {
  getLoksewaCategories {
    id
    title
    titleNP
  }
}
    `;

/**
 * __useGetLoksewaCategoriesQuery__
 *
 * To run a query within a React component, call `useGetLoksewaCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoksewaCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoksewaCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoksewaCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetLoksewaCategoriesQuery, GetLoksewaCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoksewaCategoriesQuery, GetLoksewaCategoriesQueryVariables>(GetLoksewaCategoriesDocument, options);
      }
export function useGetLoksewaCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoksewaCategoriesQuery, GetLoksewaCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoksewaCategoriesQuery, GetLoksewaCategoriesQueryVariables>(GetLoksewaCategoriesDocument, options);
        }
export type GetLoksewaCategoriesQueryHookResult = ReturnType<typeof useGetLoksewaCategoriesQuery>;
export type GetLoksewaCategoriesLazyQueryHookResult = ReturnType<typeof useGetLoksewaCategoriesLazyQuery>;
export type GetLoksewaCategoriesQueryResult = Apollo.QueryResult<GetLoksewaCategoriesQuery, GetLoksewaCategoriesQueryVariables>;
export const GetLoksewaMockCategoriesDocument = gql`
    query getLoksewaMockCategories {
  getLoksewaMockCategories {
    id
    title
    titleNP
    negativeMarkingRatio
    totalMins
  }
}
    `;

/**
 * __useGetLoksewaMockCategoriesQuery__
 *
 * To run a query within a React component, call `useGetLoksewaMockCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoksewaMockCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoksewaMockCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoksewaMockCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetLoksewaMockCategoriesQuery, GetLoksewaMockCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoksewaMockCategoriesQuery, GetLoksewaMockCategoriesQueryVariables>(GetLoksewaMockCategoriesDocument, options);
      }
export function useGetLoksewaMockCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoksewaMockCategoriesQuery, GetLoksewaMockCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoksewaMockCategoriesQuery, GetLoksewaMockCategoriesQueryVariables>(GetLoksewaMockCategoriesDocument, options);
        }
export type GetLoksewaMockCategoriesQueryHookResult = ReturnType<typeof useGetLoksewaMockCategoriesQuery>;
export type GetLoksewaMockCategoriesLazyQueryHookResult = ReturnType<typeof useGetLoksewaMockCategoriesLazyQuery>;
export type GetLoksewaMockCategoriesQueryResult = Apollo.QueryResult<GetLoksewaMockCategoriesQuery, GetLoksewaMockCategoriesQueryVariables>;
export const GetMeDocument = gql`
    query getMe {
  me {
    id
    firstName
    lastName
    middleName
    displayName
    image {
      id
      source
      preview
    }
    role
    email
    status
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetMockSetsDocument = gql`
    query getMockSets($categoryId: String!) {
  getMockSets(categoryId: $categoryId) {
    id
    type
    status
  }
}
    `;

/**
 * __useGetMockSetsQuery__
 *
 * To run a query within a React component, call `useGetMockSetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMockSetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMockSetsQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetMockSetsQuery(baseOptions: Apollo.QueryHookOptions<GetMockSetsQuery, GetMockSetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMockSetsQuery, GetMockSetsQueryVariables>(GetMockSetsDocument, options);
      }
export function useGetMockSetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMockSetsQuery, GetMockSetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMockSetsQuery, GetMockSetsQueryVariables>(GetMockSetsDocument, options);
        }
export type GetMockSetsQueryHookResult = ReturnType<typeof useGetMockSetsQuery>;
export type GetMockSetsLazyQueryHookResult = ReturnType<typeof useGetMockSetsLazyQuery>;
export type GetMockSetsQueryResult = Apollo.QueryResult<GetMockSetsQuery, GetMockSetsQueryVariables>;
export const GetMockCategoryDocument = gql`
    query getMockCategory($categoryId: String!) {
  getMockCategory(categoryId: $categoryId) {
    id
    title
    titleNP
  }
}
    `;

/**
 * __useGetMockCategoryQuery__
 *
 * To run a query within a React component, call `useGetMockCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMockCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMockCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetMockCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetMockCategoryQuery, GetMockCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMockCategoryQuery, GetMockCategoryQueryVariables>(GetMockCategoryDocument, options);
      }
export function useGetMockCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMockCategoryQuery, GetMockCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMockCategoryQuery, GetMockCategoryQueryVariables>(GetMockCategoryDocument, options);
        }
export type GetMockCategoryQueryHookResult = ReturnType<typeof useGetMockCategoryQuery>;
export type GetMockCategoryLazyQueryHookResult = ReturnType<typeof useGetMockCategoryLazyQuery>;
export type GetMockCategoryQueryResult = Apollo.QueryResult<GetMockCategoryQuery, GetMockCategoryQueryVariables>;
export const GetMockSetDocument = gql`
    query getMockSet($setId: String!) {
  getMockSet(setId: $setId) {
    category {
      id
      negativeMarkingRatio
      totalMins
      title
      titleNP
    }
    questions {
      order
      weight
      question {
        title
        optionA
        optionB
        optionC
        optionD
      }
    }
  }
}
    `;

/**
 * __useGetMockSetQuery__
 *
 * To run a query within a React component, call `useGetMockSetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMockSetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMockSetQuery({
 *   variables: {
 *      setId: // value for 'setId'
 *   },
 * });
 */
export function useGetMockSetQuery(baseOptions: Apollo.QueryHookOptions<GetMockSetQuery, GetMockSetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMockSetQuery, GetMockSetQueryVariables>(GetMockSetDocument, options);
      }
export function useGetMockSetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMockSetQuery, GetMockSetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMockSetQuery, GetMockSetQueryVariables>(GetMockSetDocument, options);
        }
export type GetMockSetQueryHookResult = ReturnType<typeof useGetMockSetQuery>;
export type GetMockSetLazyQueryHookResult = ReturnType<typeof useGetMockSetLazyQuery>;
export type GetMockSetQueryResult = Apollo.QueryResult<GetMockSetQuery, GetMockSetQueryVariables>;
export const GetCommentsDocument = gql`
    query getComments($after: String, $before: String, $first: Int, $last: Int, $skip: Int, $postId: String!) {
  getComments(
    after: $after
    before: $before
    first: $first
    last: $last
    skip: $skip
    postId: $postId
  ) {
    edges {
      node {
        id
        createdAt
        body
        children {
          id
          createdAt
          body
          user {
            id
            displayName
            image {
              preview
            }
          }
        }
        user {
          id
          displayName
          image {
            preview
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      skip: // value for 'skip'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const GetMeNotificationDocument = gql`
    query getMeNotification {
  getMeNotification {
    id
    body
    url
    read
  }
}
    `;

/**
 * __useGetMeNotificationQuery__
 *
 * To run a query within a React component, call `useGetMeNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeNotificationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeNotificationQuery(baseOptions?: Apollo.QueryHookOptions<GetMeNotificationQuery, GetMeNotificationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeNotificationQuery, GetMeNotificationQueryVariables>(GetMeNotificationDocument, options);
      }
export function useGetMeNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeNotificationQuery, GetMeNotificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeNotificationQuery, GetMeNotificationQueryVariables>(GetMeNotificationDocument, options);
        }
export type GetMeNotificationQueryHookResult = ReturnType<typeof useGetMeNotificationQuery>;
export type GetMeNotificationLazyQueryHookResult = ReturnType<typeof useGetMeNotificationLazyQuery>;
export type GetMeNotificationQueryResult = Apollo.QueryResult<GetMeNotificationQuery, GetMeNotificationQueryVariables>;
export const GetMeReactionDocument = gql`
    query getMeReaction($postId: String!) {
  getMeReaction(postId: $postId) {
    type
  }
}
    `;

/**
 * __useGetMeReactionQuery__
 *
 * To run a query within a React component, call `useGetMeReactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeReactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeReactionQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetMeReactionQuery(baseOptions: Apollo.QueryHookOptions<GetMeReactionQuery, GetMeReactionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeReactionQuery, GetMeReactionQueryVariables>(GetMeReactionDocument, options);
      }
export function useGetMeReactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeReactionQuery, GetMeReactionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeReactionQuery, GetMeReactionQueryVariables>(GetMeReactionDocument, options);
        }
export type GetMeReactionQueryHookResult = ReturnType<typeof useGetMeReactionQuery>;
export type GetMeReactionLazyQueryHookResult = ReturnType<typeof useGetMeReactionLazyQuery>;
export type GetMeReactionQueryResult = Apollo.QueryResult<GetMeReactionQuery, GetMeReactionQueryVariables>;