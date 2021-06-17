import { Button, Form, Input, message, Select } from 'antd';
import React, { useEffect } from 'react';
import { useCreateUserMutation, UserRole, UserStatus } from '../../../gql';
import AdminLayout from '../../layouts/admin';
import UploadAvatarImage from '../../../lib/components/atomic/UploadAvatarImage';

function CreateUser(): JSX.Element {
    const [createUser, { data, error, loading }] = useCreateUserMutation();

    useEffect(() => {
        if (data) {
            message.success('Succesfully created user of id: ' + data.createUser.id);
            form.resetFields()
        }
        if (error) {
            message.error('Something went wrong while creating user');
            console.log(error.message)
        }
    }, [data, error])
    const [form] = Form.useForm();
    return <Form form={form} layout="vertical" name="createUser" onFinish={(value) => { createUser({ variables: { user: value } }) }} scrollToFirstError={true} >
        <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'First Name is required' }]}
            className="max-w-sm"
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="middleName"
            label="Middle Name"
            className="max-w-sm"
        >
            <Input />

        </Form.Item>

        <Form.Item
            name="lastName"
            label="Last Name"
            className="max-w-sm"
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: 'A Valid Email is required', pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ }]}
            className="max-w-sm"
        >
            <Input />

        </Form.Item>
        <Form.Item
            name="displayName"
            label="Display Name"
            rules={[{ required: true, message: ' Name is required' }]}
            tooltip={{ title: 'The Display Name is the Name that will be shown on the Author Profile. Please enter a resonable and unoffensive Display Name. Learn more in terms and conditions.' }}
            className="max-w-sm"
        >
            <Input />

        </Form.Item>
        <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Role is required' }]}
            className="max-w-sm"
        >
            <Select placeholder="Select role">
                <Select.Option value={UserRole.User}>User</Select.Option>
                <Select.Option value={UserRole.Moderator}>Moderator</Select.Option>
                <Select.Option value={UserRole.Admin}>Admin</Select.Option>

            </Select>
        </Form.Item>
        <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Status is required' }]}
            className="max-w-sm"
        >
            <Select placeholder="Select status">
                <Select.Option value={UserStatus.Active}>Active</Select.Option>
                <Select.Option value={UserStatus.Inactive}>Inactive</Select.Option>
                <Select.Option value={UserStatus.Blocked}>Blocked</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item
            name="image"
            label="Image"
            className="max-w-sm"

        >
            <UploadAvatarImage />
        </Form.Item>

        <Form.Item className="max-w-sm">
            <Button type="primary" htmlType="submit" className="mx-4" loading={loading}>
                Submit
                </Button>
            <Button type="primary" htmlType="reset" danger={true} className="mx-4">
                Reset
                </Button>
        </Form.Item>
    </Form >
}

// eslint-disable-next-line react/display-name
CreateUser.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default CreateUser;