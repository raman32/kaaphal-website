import { Comment, Tooltip, List, Avatar, Form, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import moment from 'moment';
import useStore from '../../../store/storeProvider';
import UserAvatar from '../atomic/UserAvatar';
import { CommentIcon } from '../Icons/Index';

const Comments = () => {
    const store = useStore();
    const data = [
        {
            actions: [<span key="comment-list-reply-to-0" className={clsx(store.isDark ? 'text-gray-200' : 'text-gray-800')}>Reply to</span>],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(1, 'days').fromNow()}</span>
                </Tooltip>
            ),

        },
        {
            actions: [<span key="comment-list-reply-to-0" className={clsx(store.isDark ? 'text-gray-200' : 'text-gray-800')}>Reply to</span>],
            author: 'Han Solo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(2, 'days').fromNow()}</span>
                </Tooltip>
            ),
        },
    ];

    return <>
        <List
            className={clsx(store.isDark ? 'text-white' : 'text-black')}
            header={< div > {data.length} Comments < CommentIcon className="align-top" /></div >}
            itemLayout="horizontal"
            dataSource={data}
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
                <>
                    <Form.Item>
                        <TextArea rows={1} autoSize />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Add Comment
                </Button>
                    </Form.Item>
                </>
            }
        />
    </>

}

export default observer(Comments);