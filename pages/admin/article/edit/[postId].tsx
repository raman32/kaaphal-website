import React from 'react'
import { Spin, Form, message, Typography } from 'antd'
import { PostStatus, PostType, useGetPostQuery, } from '../../../../gql'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import useStore from '../../../../store/storeProvider'
import Error from 'next/error'
import { useUpdatePostMutation } from '../../../../gql'
import AdminLayout from '../../../layouts/admin'
import { observer } from 'mobx-react'
import ArticleForm from '../../../../lib/components/CreateArticle/Index'
function EditArticle(): JSX.Element {
    const store = useStore();
    const router = useRouter();
    const { data } = useGetPostQuery({ variables: { id: router.query.postId as string } })
    const [updatePost, { data: data_, error: error_, loading }] = useUpdatePostMutation()
    useEffect(() => {
        if (data_) {
            message.success('Succesfully edited post of id: ' + data_.updatePost.id);
            form.resetFields();
        }
        if (error_) {
            message.error('Something went wrong while editing post');
            console.log(error_.message)
        }
    }, [data_, error_])
    const [form] = Form.useForm();
    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                ...data.getPost,
                tags: data.getPost.tags.map(tag => tag.id),
                metas: data.getPost.metas.map(meta => ({ name: meta.name, content: meta.content }))
            })
        }
        console.log(data)
    }, [data])

    //TODO clean this and type this
    const handleFinish = () => {
        updatePost({
            variables: {
                post: {
                    id: router.query.postId as string,
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
                },
                scholarship: form.getFieldValue('type') === PostType.Scholarships ?
                    {
                        level: form.getFieldValue('level'),
                        country: form.getFieldValue('country'),
                        deadlineAt: form.getFieldValue('deadlineAt'),
                        startsAt: form.getFieldValue('startsAt')
                    } : undefined,
                metas: form.getFieldValue('metas') && form.getFieldValue('metas').length ?
                    form.getFieldValue('metas').map((value, index) => index < data.getPost.metas.length ?
                        ({ name: value.name, content: value.content, postId: router.query.postId as string, id: data.getPost.metas[index].id })
                        : null) : undefined

            }
        })
    }

    const handleSave = () => {
        updatePost({
            variables: {
                post: {
                    id: router.query.postId as string,
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
                },
                scholarship: form.getFieldValue('type') === PostType.Scholarships ?
                    {
                        level: form.getFieldValue('level'),
                        country: form.getFieldValue('country'),
                        deadlineAt: form.getFieldValue('deadlineAt'),
                        startsAt: form.getFieldValue('startsAt')
                    } : undefined,
                metas: form.getFieldValue('metas') && form.getFieldValue('metas').length ?
                    form.getFieldValue('metas').map((value, index) => index < data.getPost.metas.length ?
                        ({ name: value.name, content: value.content, postId: router.query.postId as string, id: data.getPost.metas[index].id })
                        : null) : undefined

            }
        })
    }


    if (!data) return <div className="self-center text-center w-full" ><Spin /> <Typography className="my-4">Loading</Typography></div>
    if (data && store.user && data.getPost.userId !== store.user.id) return <Error statusCode={403} />

    return (<ArticleForm form={form} loading={loading} onFinish={handleFinish} onSave={handleSave} state="UpdateByAdmin" />)

}

// eslint-disable-next-line react/display-name
EditArticle.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default observer(EditArticle);