import { Form, Table, Space, Button, Popconfirm, Popover, Input, Select, Pagination, message } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { PostStatus, PostType, useDeletePostMutation, useGetPostsQuery, User, UserRole, UserStatus } from '../../../gql';
import CategoryPicker from '../../../lib/components/atomic/CategoryPicker';
import MembershipPicker from '../../../lib/components/atomic/MembershipPicker';
import { PostStatusPicker } from '../../../lib/components/atomic/PostStatusPicker';
import PostTypePicker from '../../../lib/components/atomic/PostTypePicker';
import SubCategoryPicker from '../../../lib/components/atomic/SubCategoryPicker';
import { UserPopover } from '../../../lib/components/atomic/UserPopover';
import { useScrollPost } from '../../../lib/hooks/useScroll';
import AdminLayout from '../../layouts/admin';


const VerifyArticle = (): JSX.Element => {
    const [next, prev, gotoPage, page, { data, refetch }] = useScrollPost({ limit: 10, status: PostStatus.Unverified });
    const [deletePost] = useDeletePostMutation();

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Author',
            dataIndex: 'user',
            key: 'user',
            // eslint-disable-next-line react/display-name
            render: (value, record,): JSX.Element => <UserPopover user={value as User}>{value.displayName}</UserPopover>
        },
        {
            title: 'HotShot',
            key: 'hotShot',
            dataIndex: 'hotShot',

        },
        {
            title: 'Action',
            key: 'action',
            // eslint-disable-next-line react/display-name
            render: (value, record,): JSX.Element =>
            (<div className="flex flex-row flex-wrap ">
                <Popconfirm title="Sure to delete?" onConfirm={() => { deletePost({ variables: { post: { id: record.id } } }).then(() => refetch()).then(() => message.success('Sucessfully deleted post. If this was a mistake please contact administrator within 30 days.')) }}>
                    <Button type="primary" danger className="mx-2 my-2">Delete</Button>
                </Popconfirm>
                <Popconfirm title="Sure to Flag?" >
                    <Button type="primary" danger className="mx-2 my-2">Flag User</Button>
                </Popconfirm>
                <Button type="primary" className="mx-2 my-2"><Link href="/admin/article/edit/[postId]" as={'/admin/article/edit/' + record.id}>Verify</Link></Button>
                <Button danger className="mx-2 my-2">Block User</Button>
            </div >
            )

        },
    ];
    return (
        <>
            <Table columns={columns} dataSource={data ? data.getPosts.edges.map(edge => ({ ...edge.node, flags: edge.node.flag ? edge.node.flag.length : 0, editor: (edge.node.editor ? edge.node.editor.displayName : 'No Editor'), })) : []} pagination={false} />
            {data && <Pagination className="text-right my-4" defaultCurrent={1} total={data.getPosts.totalCount} pageSize={10} showSizeChanger={false} current={page + 1} onChange={(page_) => {
                gotoPage(page_ - 1);
            }} />}
        </>);
}
// eslint-disable-next-line react/display-name
VerifyArticle.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>
export default VerifyArticle;