import { Comment, Tooltip, List, Avatar, Form, Button, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Comment as CommentModel, useCreateMeCommentMutation, useGetCommentsQuery } from '../../../gql';
import useStore from '../../../store/storeProvider';
import { defaultPollingInterval } from '../../../utils/GlobalConstants';
import { skipper } from '../../accessToken';
import UserAvatar from '../atomic/UserAvatar';
import { CommentIcon, UserSvg } from '../Icons/Index';

const Comments = ({ postId, comments }: { postId: string, comments: CommentModel & { user: { displayName: string, image: { preview: string } } }[] }) => {
    const store = useStore();
    const { data: data_, loading, error, refetch } = useGetCommentsQuery({ variables: { postId: postId, first: 10 }, skip: skipper(), ssr: false, pollInterval: defaultPollingInterval })
    const [createComment] = useCreateMeCommentMutation()
    const [data, setData] = useState(comments.map(comment => ({
        actions: [<span key="comment-list-reply-to-0" className={clsx(store.isDark ? 'text-gray-200' : 'text-gray-800')}>Reply to</span>],
        author: comment.user.displayName,
        avatar: <UserAvatar user={comment.user} />,
        content: comment.body,
        datetime: (
            <Tooltip title={moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(comment.createdAt).fromNow()}</span>
            </Tooltip>
        ),

    })))
    const [form] = Form.useForm();
    useEffect(() => {
        if (data_) {
            setData(data_.getComments.edges.map(edge => (
                {
                    actions: [<span key="comment-list-reply-to-0" className={clsx(store.isDark ? 'text-gray-200' : 'text-gray-800')}>Reply to</span>],
                    author: edge.node.user.displayName,
                    avatar: <UserAvatar user={edge.node.user} />,
                    content: edge.node.body,
                    datetime: (
                        <Tooltip title={moment(edge.node.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(edge.node.createdAt).fromNow()}</span>
                        </Tooltip>
                    ),


                }
            )))
        }
    }, [data_])
    return <>

        <List
            className={clsx(store.isDark ? 'text-white' : 'text-black')}
            header={< div > {data.length} Comments < CommentIcon className="align-top" /></div >}
            itemLayout="horizontal"
            dataSource={data}
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

                    />
                </li>
            )}
        />
        <Comment
            avatar={
                <UserAvatar user={store.user} />
            }
            content={
                <Form form={form} onFinish={(value) => createComment({ variables: { comment: { ...value, postId: postId, userId: store.user.id } } })
                    .then(data_ => {
                        if (data_.data) {
                            message.success('Commented Sucsessfully')
                            refetch({ first: 10 });
                            form.resetFields();
                        }
                        else
                            message.error('Could Not Comment Please try again Later'

                            )
                    })}>
                    <Form.Item name="body" rules={[{ required: true, message: 'Please input your comment' }]}>
                        <TextArea rows={1} autoSize />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Add Comment
                </Button>
                    </Form.Item>
                </Form>
            }
        />

    </>

}

export default observer(Comments);