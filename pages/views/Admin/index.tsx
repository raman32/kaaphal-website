import { useApolloClient } from '@apollo/client';
import React from 'react';
import { useCreateAssetOnServerMutation } from '../../../gql';
import AdminLayout from '../../layouts/admin';

function AdminProfile(): JSX.Element {
    const [uploadFileMutation] = useCreateAssetOnServerMutation();
    const apolloClient = useApolloClient();
    const onChange = ({
        target: {
            validity,
            files: [file],
        },
    }) => {
        validity.valid &&
        uploadFileMutation({ variables: { file: file } }).then(() => {
            apolloClient.resetStore();
        });
        console.log(file)
    }
    return <div>Admin Profile
     <input type="file" required onChange={onChange} />;
    </div>
}

// eslint-disable-next-line react/display-name
AdminProfile.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default AdminProfile;