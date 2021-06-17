import { Card, Tag } from 'antd'
import clsx from 'clsx'
import { observer } from 'mobx-react';
import Router from 'next/router';
import { Tag as TagModel, User } from '../../../gql';
import { ReactionDto } from '../../../src/api/common/dto/reaction.dto';
import useStore from '../../../store/storeProvider'
import { tagColors } from '../../common/constants';
import UserAvatar from '../atomic/UserAvatar';
import { CommentIcon, FlagIcon } from '../Icons/Index';
import ReactionPicker from '../ReactionPicker/Index'
interface props {
    title: string;
    id: string;
    url?: string;
    slug: string;
    reactions: ReactionDto[]
    excerpt: string;
    comments: number;
    flags: number;
    image: string;
    loading?: boolean;
    author: User
    tags: TagModel[]
}
function PostCard({ title, id, url, slug, tags, reactions, excerpt, comments, flags, image, loading, author }: props): JSX.Element {
    const store = useStore();
    return <Card
        hoverable
        loading={loading}
        style={{
            overflow: 'hidden'
        }}
        className={clsx(store.isDark ? 'bg-black text-white border-gray-700 hover:border-gray-500' : '', ' my-4 mx-4 p-0 ')}
        bodyStyle={{ padding: '0', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
        onClick={() => Router.push(url ? url : '/post/' + slug)}
    >
        <div className="w-48 h-80 flex-grow sm:flex-grow-0 sm:h-52"><img alt="post Title" src={image} className="w-full h-full object-cover" /></div>
        <div className='flex flex-col justify-end w-96 flex-grow h-52 px-4 py-2'>
            <h5 className="text-base ">{title}</h5>
            <span className="text-sm my-2"><UserAvatar user={author} size={24} /> &nbsp; &nbsp;{author && author.displayName}</span>
            <div className="mb-2">
                {tags && tags.map((tag, index) => <Tag key={index}  >{tag.name}</Tag>)}
            </div>
            <div className="overflow-hidden overflow-ellipsis h-20">
                <span className="text-sm overflow-ellipsis overflow-hidden" dangerouslySetInnerHTML={{ __html: excerpt }}>
                </span>
            </div>

            <div className="flex flex-row justify-between  flex-wrap">
                <ReactionPicker reactions={reactions} postId={id} selectable={false} />
                <div className="mx-2 mt-4">{comments} <CommentIcon className="align-top" /></div>
                <div className="mx-2 mt-4">{flags} <FlagIcon className="align-top" /></div>
            </div>


        </div>
    </Card >
}

export default observer(PostCard)