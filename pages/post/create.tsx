import dynamic from 'next/dynamic'
import { Button, Input, Spin, Form, Radio, message } from 'antd'
import { Language, PostStatus, PostType, useCreateMePostMutation, useCreatePostMutation, } from '../../gql'
import CategoryPicker from '../../lib/components/atomic/CategoryPicker'
import SubCategoryPicker from '../../lib/components/atomic/SubCategoryPicker'
import { useEffect } from 'react'
import TagPicker from '../../lib/components/atomic/TagPicker'
import { defualtLayout } from '../layouts/default'
const Editor = dynamic(
    () => import('../../lib/components/atomic/Editor'),
    // eslint-disable-next-line react/display-name
    { loading: () => <Spin tip="Loading" />, ssr: false }
)
function CreateArticle(): JSX.Element {
    const [createPost, { data, loading, error }] = useCreateMePostMutation()
    useEffect(() => {
        if (data) {
            message.success('Succesfully created post of id: ' + data.createMePost.id);
            form.resetFields();
        }
        if (error) {
            message.error('Something went wrong while creating post');
            console.log(error.message)
        }
    }, [data, error])

    const [form] = Form.useForm();
    return (<Form form={form} layout="vertical" name="createArticle" onFinish={() => { createPost({ variables: { post: { ...form.getFieldsValue(), status: PostStatus.Unverified, } } }) }} >
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
                    form.validateFields().then(() => createPost({ variables: { post: { ...form.getFieldsValue(), status: PostStatus.Draft } } }))
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
CreateArticle.getLayout = defualtLayout;

export default CreateArticle;