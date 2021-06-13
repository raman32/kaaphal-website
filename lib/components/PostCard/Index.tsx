import { Card } from 'antd'
import clsx from 'clsx'
import { observer } from 'mobx-react';
import { User } from '../../../gql';
import useStore from '../../../store/storeProvider'
import UserAvatar from '../atomic/UserAvatar';
import { CommentIcon, DislikeIcon, FireIcon, FlagIcon, HappyIcon, LikeIcon, SadIcon } from '../Icons/Index';

interface props {
    title: string;
    reactions: { fire, like, dislike, happy, sad }
    excerpt: string;
    comments: number;
    flags: number;
    image: string;
    loading: boolean;
    author: User
}
function PostCard({ title, reactions, excerpt, comments, flags, image, loading, author }: props): JSX.Element {
    const store = useStore();
    return <Card
        hoverable
        loading={loading}
        style={{
            overflow: 'hidden'
        }}
        className={clsx(store.isDark ? 'bg-black text-white border-gray-700 hover:border-gray-500' : '', ' my-4 mx-4 p-0 ')}
        bodyStyle={{ padding: '0', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
    >
        <div className="w-48 h-80 flex-grow sm:flex-grow-0 sm:h-52"><img alt="post Title" src={image} className="w-full h-full object-cover" /></div>
        <div className='flex flex-col justify-end w-96 flex-grow h-52 px-4 py-2'>
            <h5 className="text-base ">{title}</h5>
            <span className="text-sm my-2"><UserAvatar user={author} size={24} /> &nbsp; &nbsp;{author && author.displayName}</span>
            <div className="overflow-hidden overflow-ellipsis">
                <span className="text-sm overflow-ellipsis overflow-hidden">
                    {excerpt}
                </span>
            </div>

            <div className="flex flex-row justify-between  flex-wrap">
                <div className="align-text-top flex flex-row flex-shrink mt-4">
                    <div className="mx-2 text-red-500">{reactions.fire} <FireIcon className="align-top" /></div>
                    <div className="mx-2 text-blue-500">{reactions.like} <LikeIcon className="align-top" /></div>
                    <div className="mx-2 text-purple-500">{reactions.dislike} <DislikeIcon className="align-top" /></div>
                    <div className="mx-2 text-yellow-500">{reactions.happy} <HappyIcon className="align-top" /></div>
                    <div className="mx-2 text-green-500" >{reactions.sad} <SadIcon className="align-top" /></div>
                </div>
                <div className="mx-2 mt-4">{comments} <CommentIcon className="align-top" /></div>
                <div className="mx-2 mt-4">{flags} <FlagIcon className="align-top" /></div>
            </div>


        </div>
    </Card >
}

export default observer(PostCard)