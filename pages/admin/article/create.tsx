import { Form, message } from 'antd'
import { PostStatus, PostType, useCreatePostMutation } from '../../../gql'
import { useEffect } from 'react'
import AdminLayout from '../../layouts/admin'
import ArticleForm from '../../../lib/components/CreateArticle/Index'

function CreateArticle(): JSX.Element {
    const [createPost, { data, loading, error }] = useCreatePostMutation()
    useEffect(() => {
        if (data) {
            message.success('Succesfully created post of id: ' + data.createPost.id);
            form.resetFields();
        }
        if (error) {
            message.error('Something went wrong while creating post');
            console.log(error.message)
        }
    }, [data, error])
    const [form] = Form.useForm();
    //TODO clean the code
    const handleFinish = () => {
        createPost({
            variables: {
                post: {
                    title: form.getFieldValue('title'),
                    body: form.getFieldValue('body'),
                    excerpt: form.getFieldValue('excerpt'),
                    slug: form.getFieldValue('slug'),
                    categoryId: form.getFieldValue('categoryId'),
                    subCategoryId: form.getFieldValue('subCategoryId'),
                    language: form.getFieldValue('language'),
                    tags: form.getFieldValue('tags'),
                    type: form.getFieldValue('type'),
                    url: form.getFieldValue('url'),
                    userId: form.getFieldValue('userId'),
                    status: form.getFieldValue('status'),
                    HTMLTitle: form.getFieldValue('HTMLTitle')
                }, scholarship: form.getFieldValue('type') === PostType.Scholarships ?
                    {
                        level: form.getFieldValue('level'),
                        country: form.getFieldValue('country'),
                        deadlineAt: form.getFieldValue('deadlineAt'),
                        startsAt: form.getFieldValue('startsAt')
                    } : undefined,
                metas: form.getFieldValue('metas') && form.getFieldValue('metas').length ? form.getFieldValue('metas') : undefined
            }
        })
    }
    const handleSave = () => {
        form.validateFields().then(() => createPost(
            {
                variables: {
                    post: {
                        title: form.getFieldValue('title'),
                        body: form.getFieldValue('body'),
                        excerpt: form.getFieldValue('excerpt'),
                        slug: form.getFieldValue('slug'),
                        categoryId: form.getFieldValue('categoryId'),
                        subCategoryId: form.getFieldValue('subCategoryId'),
                        language: form.getFieldValue('language'),
                        tags: form.getFieldValue('tags'),
                        type: form.getFieldValue('type'),
                        url: form.getFieldValue('url'),
                        userId: form.getFieldValue('userId'),
                        status: PostStatus.Draft,
                        HTMLTitle: form.getFieldValue('HTMLTitle')
                    }, scholarship: form.getFieldValue('type') === PostType.Scholarships ?
                        {
                            level: form.getFieldValue('level'),
                            country: form.getFieldValue('country'),
                            deadlineAt: form.getFieldValue('deadlineAt'),
                            startsAt: form.getFieldValue('startsAt')
                        } : undefined,
                    metas: form.getFieldValue('metas') && form.getFieldValue('metas').length ? form.getFieldValue('metas') : undefined
                }
            }
        )).then(() => form.resetFields())
    }

    return (<ArticleForm form={form} loading={loading} onFinish={handleFinish} onSave={handleSave} />)
}

// eslint-disable-next-line react/display-name
CreateArticle.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default CreateArticle;