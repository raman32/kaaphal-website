import { Button, Form, Input, InputNumber, message, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import { McqAnswer, useCreateSetQuestionMutation } from '../../../gql';
import AdminLayout from '../../layouts/admin';
import { DifficultyRater } from '../../../lib/components/atomic/DifficultyRater';
import LoksewaCategoryPicker from '../../../lib/components/atomic/LoksewaCategoryPicker';
import { useRouter } from 'next/router';


function AddQuestionToMock(): JSX.Element {
    const router = useRouter();
    console.log(router.query);
    const [createQuestion, { data, error, loading }] = useCreateSetQuestionMutation()
    useEffect(() => {
        if (error) message.error('Something went wrong while creating Question');
        if (data) {
            message.success('Succesfully created question ' + data.createSetQuestion.id);
            form.resetFields();
            setQuestionNimber(questionNumber + 1)
        }
    }, [error, data])
    const [questionNumber, setQuestionNimber] = useState(1);

    const [form] = Form.useForm();
    return <Form form={form} layout="vertical" name="nest-messages" onFinish={(value) => createQuestion({ variables: { question: { ...value, setId: router.query.setId } } })}>
        <Form.Item initialValue={questionNumber} name="order" label="Question Number" className="w-80">
            <InputNumber
                min={0}
                max={100}
            />
        </Form.Item>
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
            <Form.Item name="difficulty" label="Difficulty" initialValue={3} className="mx-4 my-4 w-80">
                <DifficultyRater />
            </Form.Item>

            <Form.Item name="categoryId" label="Category" className="mx-4 my-4  w-80">
                <LoksewaCategoryPicker />
            </Form.Item>

            <Form.Item initialValue={1} name="weight" label="Question weightage" className=" mx-4 my-4 w-80">
                <InputNumber
                    min={0}
                    max={100}
                />
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
AddQuestionToMock.getLayout = (page: JSX.Element): React.ReactNode => <AdminLayout>{page}</AdminLayout>

export default AddQuestionToMock;