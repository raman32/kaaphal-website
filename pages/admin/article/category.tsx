import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { PostType, useCreateCategoryMutation, useCreateSubCategoryMutation, useDeleteCategoryMutation, useDeleteSubCategoryMutation, useGetCategoriesWithSubCategoriesQuery, useUpdateCategoryMutation, useUpdateSubCategoryMutation, } from '../../../gql';
import { skipper } from '../../../lib/accessToken';
import AdminLayout from '../../layouts/admin';

import { PlusOutlined } from '@ant-design/icons';
import PostTypePicker from '../../../lib/components/atomic/PostTypePicker';
import CategoryPicker from '../../../lib/components/atomic/CategoryPicker';
import { useForm } from 'antd/lib/form/Form';

function CreateArticleCategory(): JSX.Element {
    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [createSubCategory] = useCreateSubCategoryMutation()
    const [updateSubCategory] = useUpdateSubCategoryMutation();
    const [deleteSubCategory] = useDeleteSubCategoryMutation();


    const { data, refetch } = useGetCategoriesWithSubCategoriesQuery({ skip: skipper(), ssr: false })
    const [showNewField, setShowNewField] = useState(false);
    const [showNewFieldSubCateogry, setShowNewFieldSubCateogry] = useState(false);
    const [postType, setPostType] = useState(PostType.Articles);
    const [categoryId, setCategoryId] = useState('');
    const [form] = useForm();
    const [formSubcateogry] = useForm();
    return (<div>
        <PostTypePicker defaultValue={postType} onChange={(value) => setPostType(value as PostType)} className="w-80" />
        { data && data.getCategories.map(category => (
            category.parentType === postType &&
            <Form layout="inline" key={category.id} className="my-4" onFinish={(value) =>
                updateCategory({ variables: { category: { id: category.id, ...value, parentType: category.parentType } } })
                    .then(() => refetch({}))
                    .then(() => message.success('Succefully edited category ' + category.name))
                    .catch((err) => {
                        message.error('Something went wrong while editing category');
                        console.log(err);
                    })
            }>
                <Form.Item
                    name="name"
                    label="Category Name "
                    initialValue={category.name}
                    rules={[{ required: true, message: 'Category Name is required' }]}
                    className="max-w-sm my-4"
                >
                    <Input />
                </Form.Item>

                <Form.Item className="max-w-sm my-4">
                    <Button type="primary" htmlType="submit" className="mx-2">Submit</Button>
                    <Button type="default" htmlType="reset" className="mx-2">Clear</Button>
                    <Button type="primary" danger className="mx-2" onClick={() => {
                        deleteCategory({ variables: { category: { id: category.id } } })
                            .then(() => refetch({}))
                            .then(() => message.success('Deleted Category ' + category.name))
                            .catch((err) => {
                                message.error('Something went wrong while deleting Category');
                                console.log(err);
                            })
                    }}>Delete</Button>
                </Form.Item>
            </Form>
        )
        )
        }
        {
            showNewField ?
                <Form form={form} layout="inline" className="my-4" onFinish={(value) => {
                    createCategory({ variables: { category: { ...value, parentType: postType } } })
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
                        name="name"
                        label="Category Name"
                        rules={[{ required: true, message: 'Category Name is required' }]}
                        className="max-w-sm my-4"
                    >
                        <Input />
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

        <CategoryPicker postType={postType} className="w-80" onChange={(value) => setCategoryId(value as string)} />
        { data && categoryId && data.getCategories.map(category => (
            category.parentType === postType && category.id === categoryId &&
            category.subCategories.map(subCategory =>
                <Form layout="inline" key={subCategory.id} className="my-4" onFinish={(value) =>
                    updateSubCategory({ variables: { subCategory: { id: subCategory.id, ...value, parentId: categoryId } } })
                        .then(() => refetch({}))
                        .then(() => message.success('Succefully edited sub category ' + category.name))
                        .catch((err) => {
                            message.error('Something went wrong while editing sub category');
                            console.log(err);
                        })
                }>
                    <Form.Item
                        name="name"
                        label="Sub Category Name "
                        initialValue={subCategory.name}
                        rules={[{ required: true, message: 'Sub Category Name is required' }]}
                        className="max-w-sm my-4"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item className="max-w-sm my-4">
                        <Button type="primary" htmlType="submit" className="mx-2">Submit</Button>
                        <Button type="default" htmlType="reset" className="mx-2">Clear</Button>
                        <Button type="primary" danger className="mx-2" onClick={() => {
                            deleteSubCategory({ variables: { subCategory: { id: subCategory.id } } })
                                .then(() => refetch({}))
                                .then(() => message.success('Deleted Category ' + subCategory.name))
                                .catch((err) => {
                                    message.error('Something went wrong while deleting Category');
                                    console.log(err);
                                })
                        }}>Delete</Button>
                    </Form.Item>
                </Form>
            ))
        )
        }
        {
            showNewFieldSubCateogry ?
                <Form form={formSubcateogry} layout="inline" className="my-4" onFinish={(value) => {
                    createSubCategory({ variables: { subCategory: { ...value, parentId: categoryId } } })
                        .then(() => refetch({}))
                        .then(() => formSubcateogry.resetFields())
                        .then(() => message.success('Created New Sub Category Succesfully'))
                        .catch((err) => {
                            message.error('Something went wrong while creating Sub Category');
                            console.log(err);
                        })
                }
                }>
                    <Form.Item
                        name="name"
                        label="Sub Category Name"
                        rules={[{ required: true, message: 'Sub Category Name is required' }]}
                        className="max-w-sm my-4"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item className="max-w-sm my-4">
                        <Button type="primary" htmlType="submit" className="mx-2">Submit</Button>
                        <Button type="default" htmlType="reset" className="mx-2">Clear</Button>
                        <Button type="primary" danger className="mx-2" onClick={() => setShowNewFieldSubCateogry(false)}>Delete</Button>
                    </Form.Item>
                </Form> : null
        }
        <Form.Item className="max-w-sm my-8">
            <Button type="dashed" onClick={() => { setShowNewFieldSubCateogry(true) }} block icon={<PlusOutlined />} disabled={showNewField}>
                Add Sub Category
              </Button>
        </Form.Item>
    </div >)

}

// eslint-disable-next-line react/display-name
CreateArticleCategory.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default CreateArticleCategory;