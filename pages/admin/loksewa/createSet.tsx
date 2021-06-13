import { Button, Form, message, Select } from 'antd';
import React, { useEffect } from 'react';
import { useCreateMockSetMutation } from '../../../gql';
import AdminLayout from '../../layouts/admin';
import { MockSetStatus, MockSetType } from '.prisma/client';
import LoksewaMockCategoryPicker from '../../../lib/components/atomic/LoksewaMockCategoryPicker';
import Router from 'next/router';


function CreateMockSet(): JSX.Element {
    const [createMockSet, { data, error, loading }] = useCreateMockSetMutation()

    useEffect(() => {
        if (error) message.error('Something went wrong while creating set');
        if (data) {
            message.success('Succesfully created Set ' + data.createMockSet.id);
            form.resetFields();
            Router.push('/admin/loksewa/addQuestionToSet/[setId]', '/admin/loksewa/addQuestionToSet/' + data.createMockSet.id)
        }
    }, [error, data])

    const [form] = Form.useForm();
    return <div className="shadow px-4 py-4 sm:px-8"> <Form form={form} layout="vertical" name="nest-messages" onFinish={(value) => createMockSet({ variables: { set: value } })}>
        <Form.Item name="categoryId" label="Select Mock Category" rules={[{ required: true }]} className="max-w-sm">
            <LoksewaMockCategoryPicker />
        </Form.Item>
        <Form.Item initialValue={MockSetType.free} name="type" label="Type" rules={[{ required: true }]} className="max-w-sm">
            <Select>
                <Select.Option value={MockSetType.free} >Free</Select.Option>
                <Select.Option value={MockSetType.official} >Offical</Select.Option>
                <Select.Option value={MockSetType.trial} >Trial</Select.Option>
                <Select.Option value={MockSetType.premium} >Premium</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item initialValue={MockSetStatus.draft} name="status" label="Status" rules={[{ required: true }]} className="max-w-sm">
            <Select>
                <Select.Option value={MockSetStatus.draft} >Draft</Select.Option>
                <Select.Option value={MockSetStatus.published} >Published</Select.Option>
                <Select.Option value={MockSetStatus.hidden} >Hidden</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item >
            <Button type="primary" htmlType="submit" className="mx-4" loading={loading}>
                Submit
      </Button>
            <Button type="primary" danger={true} htmlType="reset" className="mx-4">
                Reset
      </Button>
        </Form.Item>
    </Form >
    </div>

}

// eslint-disable-next-line react/display-name
CreateMockSet.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default CreateMockSet;