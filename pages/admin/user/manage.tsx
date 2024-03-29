import { Form, Table, Space, Button, Popconfirm, Popover, Input, Select } from 'antd';
import { useState } from 'react';
import { useGetUsersQuery, UserRole, UserStatus } from '../../../gql';
import MembershipPicker from '../../../lib/components/atomic/MembershipPicker';
import AdminLayout from '../../layouts/admin';

export interface User {
    name: string,
    email: string,
    membership: string,
    post: string,
    comments: string,
    flags: boolean,
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'displayName',
        key: 'displayName',

    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },


    {
        title: 'Membership',
        key: 'mebership',
        dataIndex: 'membership',

    }, {
        title: 'Post',
        key: 'Post',
        dataIndex: 'post',

    },
    {
        title: 'Comment',
        key: 'comment',
        dataIndex: 'comments',

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
            <Popover content={content} title="Edit" destroyTooltipOnHide>
                <Button type="primary" className="mx-2 my-2">Edit</Button>
            </Popover>
            <Button danger className="mx-2 my-2">Block</Button>
        </div>
        )

    },
];
const content = (
    <Form>
        <Form.Item label="First Name">
            <Space>
                <Form.Item
                    name="First Name"
                    noStyle
                    rules={[{ required: true, message: 'First Name is required' }]}
                >
                    <Input style={{ width: 160 }} placeholder="Please input" />
                </Form.Item>
            </Space>

        </Form.Item>
        <Form.Item label="Middle Name">
            <Space>
                <Form.Item
                    name="Middle Name"
                    noStyle
                >
                    <Input style={{ width: 160 }} placeholder="Please input" />
                </Form.Item>
            </Space>

        </Form.Item>
        <Form.Item label="Last Name">
            <Space>
                <Form.Item
                    name="Last Name"
                    noStyle
                    rules={[{ required: true, message: 'Last Name is required' }]}
                >
                    <Input style={{ width: 160 }} placeholder="Please input" />
                </Form.Item>
            </Space>

        </Form.Item>
        <Form.Item label="Email">
            <Space>
                <Form.Item
                    name="email"
                    noStyle
                    rules={[{ required: true, message: 'Email Name is required' }]}
                >
                    <Input style={{ width: 160 }} placeholder="Please input" />
                </Form.Item>
            </Space>

        </Form.Item> <Form.Item label="DisplayNmae">
            <Space>
                <Form.Item
                    name="displayname"
                    noStyle
                    rules={[{ required: true, message: ' Name is required' }]}
                >
                    <Input style={{ width: 160 }} placeholder="Please input" />
                </Form.Item>
            </Space>

        </Form.Item>
        <Form.Item label="Membership">
            <Input.Group compact>
                <Form.Item
                    name={'Membership'}
                    noStyle
                    rules={[{ required: true, message: 'Membership is required' }]}
                >
                    <Select placeholder="Select membership">

                    </Select>
                </Form.Item>
            </Input.Group>
        </Form.Item>
        <Form.Item label="Status">
            <Input.Group compact>
                <Form.Item
                    name={'Status'}
                    noStyle
                    rules={[{ required: true, message: 'Status is required' }]}
                >
                    <Select placeholder="Select status">

                    </Select>
                </Form.Item>
            </Input.Group>
        </Form.Item>

    </Form>
);

const UserManagement = (): JSX.Element => {
    const { data, loading, error, refetch } = useGetUsersQuery({ variables: { first: 20 } })
    const [searchText, setSearchText] = useState(null);
    return (
        <>
            <div className="shadow-sm bg-white my-4 text-base text-center px-4 py-2">
                Filter
            <div className="flex flex-row flex-wrap mx-4">
                    <div className="my-4 mx-4">
                        <Input className="w-56" value={searchText} onChange={({ target: { value } }) => setSearchText(value)}></Input>
                        <Button type="primary" className="mx-4" onClick={() => refetch({ first: 20, })}>Search</Button>
                    </div>
                    <div className=" my-4 mx-4">
                        <MembershipPicker onChange={(value) => { }} allowClear className="w-80" />
                    </div>
                    <div className="min-w-max my-4 mx-4">
                        <Select placeholder="Select status" allowClear>
                            <Select.Option value={UserStatus.Active}>Active</Select.Option>
                            <Select.Option value={UserStatus.Inactive}>Inactive</Select.Option>
                            <Select.Option value={UserStatus.Blocked}>Blocked</Select.Option>
                        </Select>
                    </div>
                    <div className="min-w-max my-4 mx-4">
                        <Select placeholder="Select role" allowClear>
                            <Select.Option value={UserRole.User}>User</Select.Option>
                            <Select.Option value={UserRole.Moderator}>Moderator</Select.Option>
                            <Select.Option value={UserRole.Admin}>Admin</Select.Option>

                        </Select>
                    </div>
                </div>
            </div>
            <Table columns={columns} dataSource={data ? data.getUsers.edges.map(edge => edge.node) : []} />
        </>);
}
// eslint-disable-next-line react/display-name
UserManagement.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>
export default UserManagement;