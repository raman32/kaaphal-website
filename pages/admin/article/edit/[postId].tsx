import dynamic from 'next/dynamic'
import { Button, Input, Spin, Form, Radio, message, Typography } from 'antd'
import { Language, PostStatus, PostType, useUpdateMePostMutation, useCreatePostMutation, useGetPostQuery, } from '../../../../gql'
import CategoryPicker from '../../../../lib/components/atomic/CategoryPicker'
import SubCategoryPicker from '../../../../lib/components/atomic/SubCategoryPicker'
import { useEffect } from 'react'
import TagPicker from '../../../../lib/components/atomic/TagPicker'
import { defualtLayout } from '../../../layouts/default'
import { useRouter } from 'next/router'
import useStore from '../../../../store/storeProvider'
import Error from 'next/error'
import { PostStatusPicker } from '../../../../lib/components/atomic/PostStatusPicker'
import { useUpdatePostMutation } from '../../../../gql'
import AdminLayout from '../../../layouts/admin'
import { observer } from 'mobx-react'
const Editor = dynamic(
    () => import('../../../../lib/components/atomic/Editor'),
    // eslint-disable-next-line react/display-name
    { loading: () => <Spin tip="Loading" />, ssr: false }
)
function EditArticle(): JSX.Element {
    const store = useStore();
    const router = useRouter();
    console.log(router.query)
    const { data, error, loading } = useGetPostQuery({ variables: { id: router.query.postId as string } })
    const [updatePost, { data: data_, error: error_, loading: loading_ }] = useUpdatePostMutation()
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
                title: data.getPost.title,
                categoryId: data.getPost.categoryId,
                subCategoryId: data.getPost.subCategoryId,
                language: data.getPost.language,
                body: data.getPost.body,
                tags: data.getPost.tags.map(tag => tag.id),
                status: data.getPost.status
            })
        }
    }, [data])

    if (!data) return <div className="self-center text-center w-full" ><Spin /> <Typography className="my-4">Loading</Typography></div>
    if (data && store.user && data.getPost.userId !== store.user.id) return <Error statusCode={403} />

    return (<Form form={form} layout="vertical" name="createArticle" onFinish={() => { updatePost({ variables: { post: { ...form.getFieldsValue(), id: router.query.postId as string, userId: data.getPost.userId, editorId: store.user ? store.user.id : undefined } } }) }} >
        <div className="flex flex-row flex-wrap">
            <Form.Item name="title" label="Title" rules={[{ required: true }]} className="w-80 mx-4" >
                <Input />
            </Form.Item>
            <Form.Item name="url" label="URL" rules={[{ required: true, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Please enter a valid url' }]} className="w-80 mx-4" >
                <Input addonBefore="https://kaaphal.com/post/" />
            </Form.Item>
            <Form.Item name="slug" label="Slug" rules={[{ required: true, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Please enter a valid slug    ' }]} className="w-80 mx-4" >
                <Input />
            </Form.Item>
            <Form.Item name="categoryId" label="Category" rules={[{ required: true }]} className="w-80 mx-4">
                <CategoryPicker
                    postType={PostType.Articles}
                    allowClear
                />
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.categoryId !== currentValues.categoryId}
            >
                {({ getFieldValue }) =>
                    <Form.Item name="subCategoryId" label="Sub Category" className="w-80 mx-4"
                    >
                        <SubCategoryPicker
                            categoryId={getFieldValue('categoryId')}
                            allowClear
                        />
                    </Form.Item>
                }
            </Form.Item>
            <Form.Item
                name="language"
                label="Language"
                initialValue={Language.En}
                className="w-80 mx-4"
            >
                <Radio.Group>
                    <Radio.Button value={Language.En}>🇺🇸  English</Radio.Button>
                    <Radio.Button value={Language.Np}>🇳🇵  नेपाली</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Form.Item name="tags" label="Tags" className="w-80 mx-4">
                <TagPicker allowClear />
            </Form.Item>

            <Form.Item name="body" label="Body" className="mx-4" >
                <Editor />
            </Form.Item>


            <Form.Item name="status" label="Post status" className=" w-80 mx-4" rules={[{ required: true }]} >
                <PostStatusPicker />
            </Form.Item>



            <Form.Item className="max-w-sm">
                <Button type="text" htmlType="submit" className="mx-4 bg-blue-600 hover:bg-blue-400 text-white" loading={loading}>
                    Submit
                </Button>
                <Button type="primary" htmlType="reset" danger={true} className="mx-4">
                    Reset
                </Button>
            </Form.Item>
        </div>
    </Form >
    )
}

// eslint-disable-next-line react/display-name
EditArticle.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default observer(EditArticle);