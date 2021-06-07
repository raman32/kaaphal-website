import { Descriptions, Spin } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import useStore from '../../../store/storeProvider';
import AdminLayout from '../../layouts/admin';

function AdminProfile(): JSX.Element {
    const store = useStore();
    if (!store.user) return <div className="flex flex-col h-full justify-center items-center"> <Spin /> Loading </div>
    return <div>
        <Descriptions title="User Info">
            <Descriptions.Item label="First Name">{store.user.firstName}</Descriptions.Item>
            <Descriptions.Item label="Middle Name">{store.user.middleName}</Descriptions.Item>
            <Descriptions.Item label="Last Name">{store.user.lastName}</Descriptions.Item>
            <Descriptions.Item label="Display Name">{store.user.displayName}</Descriptions.Item>
            <Descriptions.Item label="Email">{store.user.email}</Descriptions.Item>
            <Descriptions.Item label="Role">{store.user.role}</Descriptions.Item>
            <Descriptions.Item label="Status">{store.user.status}</Descriptions.Item>
        </Descriptions>,
    </div>
}

// eslint-disable-next-line react/display-name
AdminProfile.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default observer(AdminProfile);