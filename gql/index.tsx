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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

/** Model For Advertisement */
export type Advertisement = {
  __typename?: 'Advertisement';
  backgroundColor?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  clicks?: Maybe<Scalars['Float']>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  image?: Maybe<File>;
  order?: Maybe<Order>;
  post: Post;
  postId: Scalars['String'];
  startsAt: Scalars['DateTime'];
  status?: Maybe<AdvertisementStatus>;
  targetAgeLowerLimit: Scalars['Float'];
  targetAgeUpperLimit: Scalars['Float'];
  targetSex?: Maybe<AdvertisementTargetSex>;
  targetTags?: Maybe<Array<Tag>>;
  title?: Maybe<Scalars['String']>;
  type: AdvertisementType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
  views?: Maybe<Scalars['Float']>;
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
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  question: LoksewaQuestion;
  questionId: Scalars['String'];
  status: AnswerStatus;
  test: LoksewaTest;
  testId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
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
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  name: Scalars['String'];
  post: Array<Post>;
  subCategories: Array<SubCategory>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String'];
  children?: Maybe<Array<Comment>>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  parent?: Maybe<Comment>;
  post?: Maybe<Post>;
  postId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  userId: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  height: Scalars['Float'];
  /** Unique UUID string */
  id: Scalars['ID'];
  name: Scalars['String'];
  post?: Maybe<Post>;
  preview: Scalars['String'];
  size: Scalars['Float'];
  source: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  width: Scalars['Float'];
};

export type Flag = {
  __typename?: 'Flag';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
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
  updatedAt: Scalars['DateTime'];
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
  createdAt: Scalars['DateTime'];
  following: User;
  followingId: Scalars['String'];
  /** Unique UUID string */
  id: Scalars['ID'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type Hotshot = {
  __typename?: 'Hotshot';
  backgroundColor: Scalars['String'];
  body: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  image?: Maybe<File>;
  post?: Maybe<Post>;
  postId: Scalars['String'];
  title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
};

export enum Language {
  En = 'en',
  Np = 'np'
}

export type LoksewaMockCategory = {
  __typename?: 'LoksewaMockCategory';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  questionSets: Array<LoksewaMockSet>;
  title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
};

export type LoksewaMockSet = {
  __typename?: 'LoksewaMockSet';
  category: LoksewaMockCategory;
  categoryId: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
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
  updatedAt: Scalars['DateTime'];
};

export type LoksewaQuestion = {
  __typename?: 'LoksewaQuestion';
  additionalDetails: Scalars['String'];
  answer: McqAnswer;
  category: LoksewaQuestionCategory;
  categoryId: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
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
  updatedAt: Scalars['DateTime'];
  userAnswer: Array<Answer>;
};

export type LoksewaQuestionCategory = {
  __typename?: 'LoksewaQuestionCategory';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  questions: Array<LoksewaQuestion>;
  title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
};

export type LoksewaQuestionMeta = {
  __typename?: 'LoksewaQuestionMeta';
  LoksewaQuestion: Array<LoksewaQuestion>;
  body: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
};

export type LoksewaTest = {
  __typename?: 'LoksewaTest';
  answers: Array<Answer>;
  completed: Scalars['Boolean'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  score: Scalars['Float'];
  set: LoksewaMockSet;
  setId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export enum McqAnswer {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export type Membership = {
  __typename?: 'Membership';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  expiresAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  order: Order;
  type: MembershipType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
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

export type Notification = {
  __typename?: 'Notification';
  body: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  post: Post;
  postId: Scalars['String'];
  read: Scalars['Boolean'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  advertisementId: Scalars['String'];
  advertsiment?: Maybe<Advertisement>;
  amountPaid: Scalars['Float'];
  body: Scalars['String'];
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  membership?: Maybe<Membership>;
  membershipId: Scalars['String'];
  paymentId: Scalars['String'];
  paymentMethod: PaymentMethod;
  set?: Maybe<LoksewaMockSet>;
  setId: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
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
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  editor?: Maybe<User>;
  editorId?: Maybe<Scalars['String']>;
  flag: Array<Flag>;
  hotShot?: Maybe<Hotshot>;
  /** Unique UUID string */
  id: Scalars['ID'];
  image?: Maybe<File>;
  language: Language;
  publishedAt?: Maybe<Scalars['DateTime']>;
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
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  views: Scalars['Float'];
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
  post: Post;
};


export type QueryPostArgs = {
  id: Scalars['String'];
};

/** Major Category for Post */
export type Reaction = {
  __typename?: 'Reaction';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['String']>;
  type: ReactionType;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
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
  createdAt: Scalars['DateTime'];
  deadlineAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  level: ScholarshipLevel;
  post: Post;
  postId: Scalars['String'];
  startsAt: Scalars['DateTime'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
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
  createdAt: Scalars['DateTime'];
  expires: Scalars['DateTime'];
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
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

/** Sub Category for Post */
export type SubCategory = {
  __typename?: 'SubCategory';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<Category>;
  parentId?: Maybe<Scalars['String']>;
  post: Array<Post>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  email: Scalars['Boolean'];
  /** Unique UUID string */
  id: Scalars['ID'];
  postType: Array<PostType>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
  /** Unique UUID string */
  id: Scalars['ID'];
  name: Scalars['String'];
  post?: Maybe<Array<Post>>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime'];
};

/** User Model */
export type User = {
  __typename?: 'User';
  comments?: Maybe<Comment>;
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['DateTime'];
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
  updatedAt: Scalars['DateTime'];
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

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = (
  { __typename?: 'Query' }
  & { post: (
    { __typename?: 'Post' }
    & Pick<Post, 'userId' | 'title' | 'body'>
  ) }
);


export const PostDocument = gql`
    query post($id: String!) {
  post(id: $id) {
    userId
    title
    body
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;