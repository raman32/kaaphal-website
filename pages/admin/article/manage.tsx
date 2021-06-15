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
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Editor',
        key: 'editor',
        dataIndex: 'editor',

    }, {
        title: 'Views',
        key: 'views',
        dataIndex: 'views',

    },
    {
        title: 'Reactions',
        key: 'reactions',
        dataIndex: 'reactions',

    },
    {
        title: 'Comments',
        key: 'comments',
        dataIndex: 'comments',

    },
    {
        title: 'Flags',
        key: 'flags',
        dataIndex: 'flags',

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
                <Button type="primary" danger className="mx-2 my-2">Flag</Button>
            </Popconfirm>
            <Button type="primary" className="mx-2 my-2"><Link href="/admin/article/edit/[postId]" as={'/admin/article/edit/' + record.id}>Edit</Link></Button>
            <Button danger className="mx-2 my-2">Block</Button>
        </div >
        )

    },
];
const ArticleManagement = (): JSX.Element => {
    const [searchText, setSearchText] = useState(null);
    const [type, setType] = useState(null);
    const [status, setSatus] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const { data } = useGetPostsQuery({ variables: { first: 10, type, status, categoryId, subCategoryId } });
    console.log(data)
    return (
        <>
            <div className="shadow-sm bg-white my-4 text-base text-center px-4 py-2">
                Filter
            <div className="flex flex-row flex-wrap mx-4">
                    <div className="my-4 mx-4">
                        <Input className="w-56" value={searchText} onChange={({ target: { value } }) => setSearchText(value)}></Input>
                        <Button type="primary" className="mx-4" onClick={() => { }}>Search</Button>
                    </div>
                    <div className=" my-4 mx-4">
                        <PostTypePicker onChange={(value) => setType(value as PostType)} allowClear className="w-80" />
                    </div>
                    <div className=" my-4 mx-4">
                        <CategoryPicker postType={PostType.Articles} onChange={(value) => setCategoryId(value as string)} allowClear className="w-80" />
                    </div>
                    <div className=" my-4 mx-4">
                        <SubCategoryPicker categoryId={categoryId} onChange={(value) => setSubCategoryId(value as string)} allowClear className="w-80" />
                    </div>
                    <div className="min-w-max my-4 mx-4">
                        <PostStatusPicker onChange={(value) => setSatus(value)} />
                    </div>

                </div>
            </div>
            <Table columns={columns} dataSource={data ? data.getPosts.edges.map(edge => ({ ...edge.node, flags: edge.node.flag ? edge.node.flag.length : 0, editor: (edge.node.editor ? edge.node.editor.displayName : 'No Editor'), })) : []} />
        </>);
}
// eslint-disable-next-line react/display-name
ArticleManagement.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>
export default ArticleManagement;