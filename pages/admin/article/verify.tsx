import { Form, Table, Space, Button, Popconfirm, Popover, Input, Select } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { PostStatus, PostType, useGetPostsQuery, User, UserRole, UserStatus } from '../../../gql';
import CategoryPicker from '../../../lib/components/atomic/CategoryPicker';
import MembershipPicker from '../../../lib/components/atomic/MembershipPicker';
import { PostStatusPicker } from '../../../lib/components/atomic/PostStatusPicker';
import PostTypePicker from '../../../lib/components/atomic/PostTypePicker';
import SubCategoryPicker from '../../../lib/components/atomic/SubCategoryPicker';
import { UserPopover } from '../../../lib/components/atomic/UserPopover';
import AdminLayout from '../../layouts/admin';

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
            <Popconfirm title="Sure to delete?" >
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
const VerifyArticle = (): JSX.Element => {
    const { data } = useGetPostsQuery({ variables: { first: 20, status: PostStatus.Unverified } });
    console.log(data)
    return (
        <>
            <Table columns={columns} dataSource={data ? data.getPosts.edges.map(edge => ({ ...edge.node, flags: edge.node.flag ? edge.node.flag.length : 0, editor: (edge.node.editor ? edge.node.editor.displayName : 'No Editor'), })) : []} />
        </>);
}
// eslint-disable-next-line react/display-name
VerifyArticle.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>
export default VerifyArticle;