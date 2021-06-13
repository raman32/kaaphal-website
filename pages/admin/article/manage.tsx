import { Form, Table, Space, Button, Popconfirm, Popover, Input, Select } from 'antd';
import { useState } from 'react';
import { PostStatus, PostType, useGetUsersQuery, UserRole, UserStatus } from '../../../gql';
import CategoryPicker from '../../../lib/components/atomic/CategoryPicker';
import MembershipPicker from '../../../lib/components/atomic/MembershipPicker';
import PostTypePicker from '../../../lib/components/atomic/PostTypePicker';
import SubCategoryPicker from '../../../lib/components/atomic/SubCategoryPicker';
import AdminLayout from '../../layouts/admin';

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',

    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
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
        render: (record: { key: React.Key }): JSX.Element =>
        (<div className="flex flex-row flex-wrap ">
            <Popconfirm title="Sure to delete?" >
                <Button type="primary" danger className="mx-2 my-2">Delete</Button>
            </Popconfirm>
            <Popconfirm title="Sure to Flag?" >
                <Button type="primary" danger className="mx-2 my-2">Flag</Button>
            </Popconfirm>
            <Popover title="Edit" destroyTooltipOnHide>
                <Button type="primary" className="mx-2 my-2">Edit</Button>
            </Popover>
            <Button danger className="mx-2 my-2">Block</Button>
        </div>
        )

    },
];
const ArticleManagement = (): JSX.Element => {
    const [searchText, setSearchText] = useState(null);
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
                        <PostTypePicker onChange={(value) => { }} allowClear className="w-80" />
                    </div>
                    <div className=" my-4 mx-4">
                        <CategoryPicker postType={PostType.Articles} onChange={(value) => { }} allowClear className="w-80" />
                    </div>
                    <div className=" my-4 mx-4">
                        <SubCategoryPicker categoryId="" onChange={(value) => { }} allowClear className="w-80" />
                    </div>
                    <div className="min-w-max my-4 mx-4">
                        <Select placeholder="Select status" allowClear className="w-52" >
                            <Select.Option value={PostStatus.Draft}>Draft</Select.Option>
                            <Select.Option value={PostStatus.Unverified}>Unverified</Select.Option>
                            <Select.Option value={PostStatus.Verified}>Verified</Select.Option>
                            <Select.Option value={PostStatus.Published}>Published</Select.Option>
                            <Select.Option value={PostStatus.Commented}>Commented</Select.Option>
                            <Select.Option value={PostStatus.Hidden}>Hidden</Select.Option>
                            <Select.Option value={PostStatus.Blocked}>Blocked</Select.Option>
                        </Select>
                    </div>

                </div>
            </div>
            <Table columns={columns} dataSource={[]} />
        </>);
}
// eslint-disable-next-line react/display-name
ArticleManagement.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>
export default ArticleManagement;