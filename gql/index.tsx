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
  post?: Maybe<Post>;
  postId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
  userId: Scalars['String'];
};

export type CreateCategoryInput = {
  name: Scalars['String'];
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
  metaId?: Maybe<Scalars['String']>;
  optionA?: Maybe<Scalars['String']>;
  optionB?: Maybe<Scalars['String']>;
  optionC?: Maybe<Scalars['String']>;
  optionD?: Maybe<Scalars['String']>;
  setId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type CreatePostInput = {
  body?: Maybe<Scalars['String']>;
  categoryId?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
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
  questionSets: Array<LoksewaMockSet>;
  title?: Maybe<Scalars['String']>;
  titleNP?: Maybe<Scalars['String']>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type LoksewaMockSet = {
  __typename?: 'LoksewaMockSet';
  category: LoksewaMockCategory;
  categoryId: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  editor: User;
  editorId: Scalars['String'];
  /** Unique UUID string */
  id: Scalars['ID'];
  loksewaTest: Array<LoksewaTest>;
  orders: Array<Order>;
  questions: Array<LoksewaQuestion>;
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
  /** Unique UUID string */
  id: Scalars['ID'];
  meta: LoksewaQuestionMeta;
  metaId: Scalars['String'];
  optionA: Scalars['String'];
  optionB: Scalars['String'];
  optionC: Scalars['String'];
  optionD: Scalars['String'];
  set: LoksewaMockSet;
  setId: Scalars['String'];
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

export enum MockSetStatus {
  Draft = 'draft',
  Hidden = 'hidden',
  Published = 'published'
}

export enum MockSetType {
  Free = 'free',
  Official = 'official',
  Premium = 'premium'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAsset: File;
  createAssetOnServer: Scalars['Boolean'];
  createCategory: Category;
  createLoksewaCategory: LoksewaQuestionCategory;
  createMePost: Post;
  createPost: Post;
  createQuestion: LoksewaQuestion;
  createSubCategory: Category;
  createTag: Category;
  createUser: User;
  deleteLoksewaCategory: Scalars['Boolean'];
  sendMagicLink: MagicLink;
  updateLoksewaCategory: LoksewaQuestionCategory;
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


export type MutationCreateMePostArgs = {
  post: CreatePostInput;
};


export type MutationCreatePostArgs = {
  post: CreatePostInput;
};


export type MutationCreateQuestionArgs = {
  question: CreateLoksewaQuestionInput;
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


export type MutationDeleteLoksewaCategoryArgs = {
  category: UpdateLoksewaQuestionCategoryInput;
};


export type MutationSendMagicLinkArgs = {
  email: Scalars['String'];
};


export type MutationUpdateLoksewaCategoryArgs = {
  category: UpdateLoksewaQuestionCategoryInput;
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
  flag: Array<Flag>;
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
  getLoksewaCategories: Array<LoksewaQuestionCategory>;
  getPost: Post;
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


export type QueryGetPostArgs = {
  id: Scalars['String'];
};


export type QueryGetPostsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
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
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
  type: ReactionType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
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

export type UpdateLoksewaQuestionCategoryInput = {
  id: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  titleNP?: Maybe<Scalars['String']>;
};


/** User Model */
export type User = {
  __typename?: 'User';
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

export type GetPostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostQuery = (
  { __typename?: 'Query' }
  & { getPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'userId' | 'title' | 'body'>
  ) }
);

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
  )> }
);

export type GetCategoriesWithSubCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesWithSubCategoriesQuery = (
  { __typename?: 'Query' }
  & { getCategories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
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
    & Pick<Category, 'name'>
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
          & Pick<File, 'source' | 'preview'>
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

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'middleName' | 'displayName' | 'role' | 'email' | 'status'>
    & { image?: Maybe<(
      { __typename?: 'File' }
      & Pick<File, 'source' | 'preview'>
    )> }
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
    mutation createPost($post: CreatePostInput!) {
  createPost(post: $post) {
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
export const GetPostDocument = gql`
    query getPost($id: String!) {
  getPost(id: $id) {
    userId
    title
    body
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
export const GetCategoriesDocument = gql`
    query getCategories {
  getCategories {
    id
    name
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
export const GetMeDocument = gql`
    query getMe {
  me {
    id
    firstName
    lastName
    middleName
    displayName
    image {
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