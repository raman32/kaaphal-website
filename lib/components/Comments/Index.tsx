import { Comment, Tooltip, List, message } from 'antd';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDeleteMeCommentMutation, useGetCommentsQuery, User } from '../../../gql';
import useStore from '../../../store/storeProvider';
import { defaultPollingInterval } from '../../../utils/GlobalConstants';
import { skipper } from '../../accessToken';
import UserAvatar from '../atomic/UserAvatar';
import { CommentIcon } from '../Icons/Index';
import { CommentInput } from './input';
import { CommentDto } from '../../../src/api/common/dto/comment.dto';

//TODO Refractor the code 
const Comments = ({ postId, comments }: { postId: string, comments: CommentDto[] }) => {
    const store = useStore();
    const { data, loading, refetch } = useGetCommentsQuery({ variables: { postId: postId, first: 20 }, skip: skipper(), ssr: false, pollInterval: defaultPollingInterval })
    const [deleteComment] = useDeleteMeCommentMutation();
    const [parentId, setParentId] = useState('');
    const [commentRenderData, setCommentRenderData] = useState(comments.map(comment => ({
        id: comment.id,
        actions: [<span key="comment-list-reply-to-0" onClick={() => setParentId(comment.id)}>Replies</span>,
        ],
        author: comment.user.displayName,
        avatar: <UserAvatar user={comment.user as User} />,
        content: comment.body,
        children: comment.children,
        datetime: (
            <Tooltip title={moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(comment.createdAt).fromNow()}</span>
            </Tooltip>
        ),
    })))

    useEffect(() => {
        if (data) {
            setCommentRenderData(data.getComments.edges.map(edge => ({
                id: edge.node.id,
                actions: [<span key="comment-list-reply-to-0" onClick={() => setParentId(edge.node.id)}>Reply to</span>,
                store.user && store.user.id === edge.node.user.id ? <span key="comment-list-reply-to-0" onClick={() => deleteComment({ variables: { comment: { id: edge.node.id } } }).then(() => refetch()).then(() => message.success('Comment deleted Succesfully'))}>Delete</span> : <></>],
                author: edge.node.user.displayName,
                avatar: <UserAvatar user={edge.node.user as User} />,
                content: edge.node.body,
                children: edge.node.children as CommentDto[],
                datetime: (
                    <Tooltip title={moment(edge.node.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(edge.node.createdAt).fromNow()}</span>
                    </Tooltip>
                ),
            }
            )))
        }
    }, [data])
    return <>

        <List
            className={clsx(store.isDark ? 'text-white' : 'text-black')}
            header={< div > {commentRenderData.length} Comments < CommentIcon className="align-top" /></div >}
            itemLayout="horizontal"
            dataSource={commentRenderData}
            loading={loading}
            loadMore={<div className="cursor-pointer hover:opacity-70" >Load more Comments</div>}
            renderItem={item => (
                <li>
                    <Comment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}

                    >
                        {item.children && parentId === item.id && item.children.map(comment => <Comment key={comment.id} actions={item.actions} author={comment.user.displayName} avatar={<UserAvatar user={comment.user as User} />} content={comment.body} datetime={<Tooltip title={moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(comment.createdAt).fromNow()}</span>
                        </Tooltip>} />)}
                        {parentId === item.id && < CommentInput onSuccess={() => refetch()} onError={() => null} postId={postId} parentId={item.id} />}
                    </Comment>
                </li>
            )}
        />
        <CommentInput onSuccess={() => refetch()} onError={() => null} postId={postId} />
    </>

}

export default observer(Comments);