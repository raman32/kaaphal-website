import { Comment, Post, Tag as TagModel, User } from '.prisma/client';
import { Head } from '@nestjs/common';
import { Tooltip, Tag, Alert, Divider } from 'antd';
import { InferGetServerSidePropsType, NextPage } from 'next';
import UserAvatar from '../../lib/components/atomic/UserAvatar';
import { PenIcon } from '../../lib/components/Icons/Index';
import ReactionPicker from '../../lib/components/ReactionPicker/Index';
import AuthorCard from '../../lib/components/AuthorCard/Index';
import { defualtLayout } from '../layouts/default';
import Comments from '../../lib/components/Comments/Index';

const tagColors = ['magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple']
const PostPage = ({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const postParsed = JSON.parse(post) as Post & { user: User, comments: Comment, tags: TagModel[] };
    return (<div className="mx-4 sm:mx-8 w-full">
        <div className="w-full shadow h-80 sm:h-96 text-center flex flex-col justify-center items-center bg-indigo-500 bg-gradient-to-br text-white"><UserAvatar user={postParsed.user} size={96} className="border-gray-500 border-solid border-2" />
            <h1 className="text-xl font-bold">
                {postParsed.title}
            </h1>

            <h5 className="">
                <PenIcon className="align-text-bottom " />&nbsp; {postParsed.user && postParsed.user.displayName}
            </h5>

        </div>
        <span className="italic"> {postParsed.status === 'published' ? 'Published On: ' + postParsed.publishedAt :
            <Tooltip title="Kaaphal take articles from the user and verify that the article is not fake, plagarized, misleading, or inappropriate for our users. As a bonus we also optimized our users articles for Search Engines." >
                {'This article is still in ' + postParsed.status + ' status. If you have recently submitted the post then please be patience while we are working to review the article.'}</Tooltip>}</span>
        <div className="my-4 text-justify ">

            <div className="my-4">
                {postParsed.tags.map((tag, index) => <Tag key={index} color={tagColors[index % 11]} >{tag.name}</Tag>)}
            </div>

            {
                postParsed.status === 'unverified' ?
                    <Alert message="Warning this article is not yet verified. Approach with caution." type="warning" showIcon closable className="my-4" /> :
                    postParsed.status === 'blocked' ?
                        <Alert message="Warning this article has been blocked. If you are the author of the post and think that the blocking was a mistake please submit a review request we are happy to help you" type="error" showIcon closable className="my-4" /> :
                        null
            }
            <div className="block post-body">
                <span dangerouslySetInnerHTML={{ __html: postParsed.body }} className="text-base antialiased" />
            </div>
            <Divider />
            <div className="text-center block text-lg ">
                <ReactionPicker like={10} dislike={0} happy={10} sad={0} fire={50} onChange={() => { }} selected={"happy"} />
            </div>
            <div className="my-4">
                <AuthorCard user={postParsed.user} />
            </div>
            <div className="my-4">
                <Comments />
            </div>
        </div>
    </div>)
}

export async function getServerSideProps(context) {
    return {
        props: { post: JSON.stringify(context.query.post) }, // will be passed to the page component as props
    }
}

PostPage.getLayout = defualtLayout
export default PostPage;
