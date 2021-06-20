import { Button, Form, Input } from 'antd';
import { useState } from 'react';

export interface MetaInputProps {
    initialValue?: { name: string, content: string }
    onChange: ({ name, content }) => void
    onRemove: () => void
}

const MetaInput: React.FC<MetaInputProps> = ({ initialValue, onChange, onRemove }) => {
    const [submitted, setSubmitted] = useState(false);
    const [form] = Form.useForm()
    return (
        <Form form={form} layout="inline" onFinish={(value) => {
            onChange(value)
            setSubmitted(true)
        }} className="flex flex-row " style={{ minHeight: '10rem' }} >
            <Form.Item label="name" name='name' initialValue={initialValue ? initialValue.name : ''} rules={[{ required: true }]} className="w-40" >
                <Input disabled={!!initialValue} onChange={() => setSubmitted(false)} />
            </Form.Item>
            <Form.Item label="content" name="content" rules={[{ required: true }]} className="w-80" initialValue={initialValue ? initialValue.content : ''}>
                <Input.TextArea onChange={() => setSubmitted(false)} />
            </Form.Item>
            <Button onClick={() => form.submit()} disabled={submitted} className="mx-4 my-8">
                Set Meta
            </Button>
            <Button type="default" danger onClick={onRemove} className="mx-4 my-8">
                Remove Meta
            </Button>
        </Form >
    )

}

export default MetaInput;