import { Button, Form, Input, message, Radio } from 'antd';
import React, { useEffect } from 'react';
import { McqAnswer, useCreateQuestionMutation } from '../../gql';
import AdminLayout from '../layouts/admin';
import { DifficultyRater } from '../../lib/components/atomic/DifficultyRater';
import LoksewaCategoryPicker from '../../lib/components/atomic/LoksewaCategoryPicker';


function CreateArticleCategory(): JSX.Element {
    const [createQuestion, { data, error, loading }] = useCreateQuestionMutation()
    useEffect(() => {
        if (error) message.error('Something went wrong while creating tag');
        if (data) {
            message.success('Succesfully created tag ' + data.createQuestion.id);
            form.resetFields();
        }
    }, [error, data])

    const [form] = Form.useForm();
    return <Form form={form} layout="vertical" name="nest-messages" onFinish={(value) => createQuestion({ variables: { question: value } })}>
        <Form.Item name="title" label="Question" rules={[{ required: true }]}>
            <Input.TextArea />
        </Form.Item>
        <Form.Item name="optionA" label="Option A" rules={[{ required: true }]}>
            <Input.TextArea />
        </Form.Item>
        <Form.Item name="optionB" label="Option B" rules={[{ required: true }]}>
            <Input.TextArea />
        </Form.Item>
        <Form.Item name="optionC" label="Option C" rules={[{ required: true }]}>
            <Input.TextArea />
        </Form.Item>
        <Form.Item name="optionD" label="Option D" rules={[{ required: true }]}>
            <Input.TextArea />
        </Form.Item>
        <Form.Item name="answer" label="AnswerKey" rules={[{ required: true }]}>
            <Radio.Group  >
                <Radio.Button value={McqAnswer.A}>A</Radio.Button>
                <Radio.Button value={McqAnswer.B}>B</Radio.Button>
                <Radio.Button value={McqAnswer.C}>C</Radio.Button>
                <Radio.Button value={McqAnswer.D}>D</Radio.Button>
            </Radio.Group>
        </Form.Item>
        <Form.Item name="additionalDetails" label="Additional Detials" >
            <Input.TextArea />
        </Form.Item>
        <div className="flex flex-row flex-wrap">
            <Form.Item name="difficulty" label="Difficulty" initialValue={3} className="w-80">
                <DifficultyRater />
            </Form.Item>

            <Form.Item name="categoryId" label="Category" className="w-80">
                <LoksewaCategoryPicker />
            </Form.Item>
        </div>

        <Form.Item >
            <Button type="primary" htmlType="submit" className="mx-4" loading={loading}>
                Submit
      </Button>
            <Button type="primary" danger={true} htmlType="reset" className="mx-4">
                Reset
      </Button>
        </Form.Item>
    </Form >

}

// eslint-disable-next-line react/display-name
CreateArticleCategory.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default CreateArticleCategory;