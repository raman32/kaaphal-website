import { Button, Form, Input, InputNumber, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCreateLoksewaMockCategoryMutation, useDeleteLoksewaMockCategoryMutation, useGetLoksewaMockCategoriesQuery, useUpdateLoksewaCategoryMutation, useUpdateLoksewaMockCategoryMutation } from '../../gql';
import AdminLayout from '../layouts/admin';
import { PlusOutlined } from '@ant-design/icons';
import { skipper } from '../../lib/accessToken';
import { useForm } from 'antd/lib/form/Form';

function CreateLoksewaMockCategory(): JSX.Element {
    const { data, refetch } = useGetLoksewaMockCategoriesQuery({ skip: skipper(), ssr: false })
    const [createCategory] = useCreateLoksewaMockCategoryMutation();
    const [deleteCategory] = useDeleteLoksewaMockCategoryMutation();
    const [updateCategory] = useUpdateLoksewaMockCategoryMutation();
    //TODO fix this
    //if (!data) return <div className="flex flex-col h-full justify-center items-center"> <Spin /> Loading </div>
    const [showNewField, setShowNewField] = useState(false);
    const [form] = useForm();
    return (<div>
        { data && data.getLoksewaMockCategories.map(category => (
            <Form layout="inline" key={category.id} className="my-4" onFinish={(value) =>
                updateCategory({ variables: { category: { id: category.id, ...value } } })
                    .then(() => refetch({}))
                    .then(() => message.success('Succefully edited category ' + category.title))
                    .catch((err) => {
                        message.error('Something went wrong while editing category');
                        console.log(err);
                    })
            }>
                <Form.Item
                    name="title"
                    label="Category Name in English"
                    initialValue={category.title}
                    rules={[{ required: true, message: 'Category Name is required' }]}
                    className="max-w-sm my-4"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="titleNP"
                    label="Category Name in Nepali"
                    initialValue={category.titleNP}
                    rules={[{ required: true, message: 'Category Name is required' }]}
                    className="max-w-sm my-4"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="totalMins"
                    label="Total Minutes"
                    initialValue={category.totalMins}
                    rules={[{ required: true, message: 'Category Name is required' }]}
                    className="max-w-sm my-4"
                >
                    <InputNumber
                        min={0}
                        max={300}
                    />
                </Form.Item>
                <Form.Item
                    name="negativeMarkingRatio"
                    label="Negative marking"
                    initialValue={category.negativeMarkingRatio}
                    rules={[{ required: true, message: 'Category Name is required' }]}
                    className="max-w-sm my-4"
                >
                    <InputNumber
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                    />
                </Form.Item>
                <Form.Item className="max-w-sm my-4">
                    <Button type="primary" htmlType="submit" className="mx-2">Submit</Button>
                    <Button type="default" htmlType="reset" className="mx-2">Clear</Button>
                    <Button type="primary" danger className="mx-2" onClick={() => {
                        deleteCategory({ variables: { category: { id: category.id } } })
                            .then(() => refetch({}))
                            .then(() => message.success('Deleted Category ' + category.title))
                            .catch((err) => {
                                message.error('Something went wrong while deleting Category');
                                console.log(err);
                            })
                    }}>Delete</Button>
                </Form.Item>
            </Form>
        )
        )}
        {
            showNewField ?
                <Form form={form} layout="inline" className="my-4" onFinish={(value) => {
                    createCategory({ variables: { category: value } })
                        .then(() => refetch({}))
                        .then(() => form.resetFields())
                        .then(() => message.success('Created New Category Succesfully'))
                        .catch((err) => {
                            message.error('Something went wrong while creating Category');
                            console.log(err);
                        })
                }
                }>
                    <Form.Item
                        name="title"
                        label="Category Name in English"
                        rules={[{ required: true, message: 'Category Name is required' }]}
                        className="max-w-sm my-4"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="titleNP"
                        label="Category Name in Nepali"
                        rules={[{ required: true, message: 'Category Name is required' }]}
                        className="max-w-sm my-4"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="totalMins"
                        label="Total Minutes"
                        initialValue={90}
                        rules={[{ required: true, message: 'Total time is required' }]}
                        className="max-w-sm my-4"
                    >
                        <InputNumber
                            min={0}
                            max={300}
                        />
                    </Form.Item>
                    <Form.Item
                        name="negativeMarkingRatio"
                        label="Negative marking"
                        initialValue={0}
                        rules={[{ required: true, message: 'Negative Marking ratio is required put 0 if it doesnot apply' }]}
                        className="max-w-sm my-4"
                    >
                        <InputNumber
                            min={0}
                            max={100}
                            formatter={value => `${value}%`}
                        />
                    </Form.Item>
                    <Form.Item className="max-w-sm my-4">
                        <Button type="primary" htmlType="submit" className="mx-2">Submit</Button>
                        <Button type="default" htmlType="reset" className="mx-2">Clear</Button>
                        <Button type="primary" danger className="mx-2" onClick={() => setShowNewField(false)}>Delete</Button>
                    </Form.Item>
                </Form> : null
        }
        <Form.Item className="max-w-sm my-8">
            <Button type="dashed" onClick={() => { setShowNewField(true) }} block icon={<PlusOutlined />} disabled={showNewField}>
                Add Category
              </Button>
        </Form.Item>
    </div >)




}

// eslint-disable-next-line react/display-name
CreateLoksewaMockCategory.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default CreateLoksewaMockCategory;