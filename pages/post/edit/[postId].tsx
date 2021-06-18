import dynamic from 'next/dynamic'
import { Button, Input, Spin, Form, Radio, message, Typography } from 'antd'
import { Language, PostStatus, PostType, useUpdateMePostMutation, useCreatePostMutation, useGetPostQuery, } from '../../../gql'
import CategoryPicker from '../../../lib/components/atomic/CategoryPicker'
import SubCategoryPicker from '../../../lib/components/atomic/SubCategoryPicker'
import { useEffect } from 'react'
import TagPicker from '../../../lib/components/atomic/TagPicker'
import { defualtLayout } from '../../layouts/default'
import { useRouter } from 'next/router'
import useStore from '../../../store/storeProvider'
import Error from 'next/error'
const Editor = dynamic(
    () => import('../../../lib/components/atomic/Editor'),
    // eslint-disable-next-line react/display-name
    { loading: () => <Spin tip="Loading" />, ssr: false }
)
function EditArticle(): JSX.Element {
    const store = useStore();
    const router = useRouter();
    console.log(router.query)
    const { data, error, loading } = useGetPostQuery({ variables: { id: router.query.postId as string } })
    const [updatePost, { data: data_, error: error_, loading: loading_ }] = useUpdateMePostMutation()
    useEffect(() => {
        if (data_) {
            message.success('Succesfully edited post of id: ' + data_.updateMePost.id);
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
                tags: data.getPost.tags.map(tag => tag.id)
            })
        }
    }, [data])

    if (!data) return <div className="self-center text-center w-full" ><Spin /> <Typography className="my-4">Loading</Typography></div>
    if (data && !data.getPost) return <Error statusCode={404} />
    if (data && data.getPost.userId !== store.user.id) return <Error statusCode={403} />

    return (<Form form={form} layout="vertical" name="createArticle" onFinish={() => { updatePost({ variables: { post: { ...form.getFieldsValue(), id: router.query.postId as string, status: PostStatus.Unverified, } } }) }} >
        <div className="flex flex-row flex-wrap">
            <Form.Item name="title" label="Title" rules={[{ required: true }]} className="w-80 mx-4" >
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


            <Form.Item className="max-w-sm">
                <Button type="text" htmlType="submit" className="mx-4 bg-blue-600 hover:bg-blue-400 text-white" loading={loading}>
                    Submit
                </Button>
                <Button type="text" htmlType="button" className="mx-4 bg-green-600 hover:bg-green-400 text-white" loading={loading} onClick={() => {
                    form.validateFields().then(() => updatePost({ variables: { post: { ...form.getFieldsValue(), status: PostStatus.Draft } } }))
                }}>
                    Save
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
EditArticle.getLayout = defualtLayout;

export default EditArticle;