import { Form } from 'antd';
import React from 'react';
import AdminLayout from '../layouts/admin';

function CreateArticleCategory(): JSX.Element {
    return <Form>

    </Form>

}

// eslint-disable-next-line react/display-name
CreateArticleCategory.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default CreateArticleCategory;