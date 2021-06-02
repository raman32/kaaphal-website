import AdminLayout from '../../layouts/default'
import dynamic from 'next/dynamic'
import { Button, Input, Spin, Form, DatePicker, Radio, message } from 'antd'
import { Language, PostStatus, PostType, useCreatePostMutation, UserRole } from '../../../gql'
import CountryPicker from '../../../lib/components/CountryPicker'
import PostTypePicker from '../../../lib/components/PostTypePicker'
import ScholarshipLevelPicker from '../../../lib/components/ScholarshipLevelPicker'
import CategoryPicker from '../../../lib/components/CategoryPicker'
import SubCategoryPicker from '../../../lib/components/SubCategoryPicker'
import UserPicker from '../../../lib/components/UserPicker'
import { useEffect } from 'react'
import TagPicker from '../../../lib/components/TagPicker'
const Editor = dynamic(
    () => import('../../../lib/components/Editor'),
    // eslint-disable-next-line react/display-name
    { loading: () => <Spin tip="Loading" />, ssr: false }
)
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
    return (<Form form={form} layout="vertical" name="createArticle" onFinish={() => { createPost({ variables: { post: { ...form.getFieldsValue(), status: PostStatus.Unverified, } } }) }} >
        <Form.Item name="title" label="Title" rules={[{ required: true }]} className="max-w-sm" >
            <Input />
        </Form.Item>
        <Form.Item name="url" label="URL" rules={[{ required: true, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Please enter a valid url' }]} className="max-w-sm" >
            <Input addonBefore="https://kaaphal.com/post/" />
        </Form.Item>
        <Form.Item name="slug" label="Slug" rules={[{ required: true, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Please enter a valid slug    ' }]} className="max-w-sm" >
            <Input />
        </Form.Item>
        <Form.Item name="type" label="Type" rules={[{ required: true }]} className="max-w-sm" >
            <PostTypePicker
                allowClear />
        </Form.Item>
        <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
        >
            {({ getFieldValue }) =>
                getFieldValue('type') === PostType.Scholarships ? (
                    <> <Form.Item name="country" label="Country" rules={[{ required: true }]} className="max-w-sm">
                        <CountryPicker

                            allowClear
                        />
                    </Form.Item>
                        <Form.Item name="startsAt" label="Starts" rules={[{ required: true }]} className="max-w-sm">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="deadlineAt" label="Deadline" rules={[{ required: true }]} className="max-w-sm">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="level" label="Level" rules={[{ required: true }]} className="max-w-sm" >
                            <ScholarshipLevelPicker

                                allowClear
                            />
                        </Form.Item>
                    </>
                ) :
                    <>
                        <Form.Item name="categoryId" label="Category" rules={[{ required: true }]} className="max-w-sm">
                            <CategoryPicker
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.categoryId !== currentValues.categoryId}
                        >
                            {({ getFieldValue }) =>
                                <Form.Item name="subCategoryId" label="Sub Category" className="max-w-sm"
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
                            className="max-w-sm"
                        >
                            <Radio.Group>
                                <Radio.Button value={Language.En}>🇺🇸  English</Radio.Button>
                                <Radio.Button value={Language.Np}>🇳🇵  नेपाली</Radio.Button>
                            </Radio.Group>
                        </Form.Item>

                    </>
            }
        </Form.Item>
        <Form.Item name="tags" label="Tags" className="max-w-sm">
            <TagPicker allowClear />
        </Form.Item>

        <Form.Item name="body" label="Body" >
            <Editor />
        </Form.Item>

        <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.Type !== currentValues.type}
        >
            {({ getFieldValue }) =>
                <Form.Item name="userId" label="User" rules={[{ required: true }]} className="max-w-sm">
                    <UserPicker allowClear roles={getFieldValue('type') === PostType.Scholarships ? [UserRole.Admin, UserRole.Moderator] : null} />
                </Form.Item>}
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
            <Button type="text" htmlType="reset" onClick={() => { form.resetFields() }} className="bg-red-600 hover:bg-red-400 text-white mx-4">
                Reset
                </Button>
        </Form.Item>

    </Form>)
}

// eslint-disable-next-line react/display-name
CreateArticle.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default CreateArticle;