import { Alert, Button, DatePicker, Form, FormInstance, Input, Radio, Spin } from 'antd'
import dynamic from 'next/dynamic'
import { Language, PostStatus, PostType, UserRole } from '../../../gql'
import { useSeoCheck } from '../../hooks/useSeoCheck'
import CategoryPicker from '../atomic/CategoryPicker'
import CountryPicker from '../atomic/CountryPicker'
const Editor = dynamic(
    () => import('../atomic/Editor'),
    // eslint-disable-next-line react/display-name
    { loading: () => <Spin tip="Loading" />, ssr: false }
)
import { PostStatusPicker } from '../atomic/PostStatusPicker'
import PostTypePicker from '../atomic/PostTypePicker'
import ScholarshipLevelPicker from '../atomic/ScholarshipLevelPicker'
import SubCategoryPicker from '../atomic/SubCategoryPicker'
import TagPicker from '../atomic/TagPicker'
import UserPicker from '../atomic/UserPicker'
import MetaInputs from '../MetaInputs/Index'
interface ArticleFormProps {
    form: FormInstance,
    loading?: boolean,
    state?: 'CreateByUser' | 'UpdateByUser' | 'CreateByAdmin' | 'UpdateByAdmin'
    onFinish: () => void
    onSave: () => void
}
const ArticleForm: React.FC<ArticleFormProps> = ({ form, loading, state = 'CreateByUser', onFinish, onSave }) => {
    const { seoProblems, checkOptimization } = useSeoCheck(form);
    return <Form form={form} layout="vertical" name="createArticle"
        onFinish={onFinish} >
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
            <Form.Item name="type" label="Type" rules={[{ required: true }]} className="w-80 mx-4" >
                <PostTypePicker
                    allowClear />
            </Form.Item>
            <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
            >
                {({ getFieldValue }) =>
                    getFieldValue('type') === PostType.Scholarships ? (
                        <> <Form.Item name="country" label="Country or Regions" rules={[{ required: true }]} className="w-80 mx-4">
                            <CountryPicker

                                allowClear
                            />
                        </Form.Item>
                            <Form.Item name="startsAt" label="Starts" className="w-80 mx-4">
                                <DatePicker />
                            </Form.Item>
                            <Form.Item name="deadlineAt" label="Deadline" className="w-80 mx-4">
                                <DatePicker />
                            </Form.Item>
                            <Form.Item name="level" label="Level" rules={[{ required: true }]} className="w-80 mx-4" >
                                <ScholarshipLevelPicker

                                    allowClear
                                />
                            </Form.Item>
                        </>
                    ) :
                        <>

                            <Form.Item name="categoryId" label="Category" rules={[{ required: true }]} className="w-80 mx-4">
                                <CategoryPicker
                                    postType={getFieldValue('type')}
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

                        </>
                }

            </Form.Item>
        </div>
        <Form.Item name="tags" label="Tags" className="w-80 mx-4">
            <TagPicker allowClear />
        </Form.Item>

        <Form.Item name="body" label="Body" className="mx-4" >
            <Editor />
        </Form.Item>

        <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.Type !== currentValues.type}
        >
            {({ getFieldValue }) =>
                <Form.Item name="userId" label="User" rules={[{ required: true }]} className="w-80 mx-4">
                    <UserPicker allowClear roles={getFieldValue('type') === PostType.Scholarships ? [UserRole.Admin, UserRole.Moderator] : null} />
                </Form.Item>}
        </Form.Item>

        <Form.Item initialValue={PostStatus.Unverified} name="status" label="Post status" className="w-80 mx-4" rules={[{ required: true }]} >
            <PostStatusPicker />
        </Form.Item>
        <div className="shadow py-4 my-4">
            <div className="my-4 mx-4">
                Seo Optimizer
    </div>
            <Form.Item name="HTMLTitle" label="HTML Title" rules={[{ required: true }]} className="w-80 mx-4" >
                <Input />
            </Form.Item>

            {state === 'UpdateByAdmin' ?
                <Form.Item name="metas" label="Metas" className="mx-4" initialValue={[]}>
                    <MetaInputs />
                </Form.Item>
                :
                <Form.Item name="metas" label="Metas" className="mx-4" initialValue={[{ name: 'description', content: '' }, { name: 'keywords', content: '' }]}>
                    <MetaInputs />
                </Form.Item>

            }

            <Form.Item name="targetWord" label="Targeted Word" className=" mx-4" >
                <Input className="w-80" />
            </Form.Item>
            <Button type="text" className="mx-4 bg-blue-600 hover:bg-blue-400 text-white" onClick={() => checkOptimization()}>
                Check Optimization
    </Button>
            {seoProblems.map(value => value.hasError ? <Alert type="warning" message={value.errorText} className="max-w-sm my-4" showIcon></Alert> : null)}
        </div>
        <Form.Item className="max-w-sm">
            <Button type="text" htmlType="submit" className="mx-4 bg-blue-600 hover:bg-blue-400 text-white" loading={loading}>
                Submit
        </Button>
            <Button type="text" htmlType="button" className="mx-4 bg-green-600 hover:bg-green-400 text-white" loading={loading} onClick={onSave}>
                Save
        </Button>
            <Button type="primary" htmlType="reset" danger={true} className="mx-4">
                Reset
        </Button>
        </Form.Item>
    </Form >
}

export default ArticleForm;