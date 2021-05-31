import React from 'react';
import AdminLayout from '../../layouts/admin';

function AdminProfile(): JSX.Element {
    return <div>Admin Profile</div>
}

// eslint-disable-next-line react/display-name
AdminProfile.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default AdminProfile;