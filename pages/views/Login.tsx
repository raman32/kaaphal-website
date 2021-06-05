import { Button, Form, Input } from 'antd/lib/';
import { NextPage } from 'next';
import { InfoCircleOutlined, MailOutlined, FacebookFilled, GoogleOutlined } from '@ant-design/icons';
import { useSendMagicLinkMutation } from '../../gql'
import Router from 'next/router';
const Login: NextPage<Record<string, never>> = () => {
    const [sendMagicLink, { loading, data, called }] = useSendMagicLinkMutation()
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        },
    };
    /* eslint-enable no-template-curly-in-string */
    const onFinish = ({ user: { email } }) => {
        sendMagicLink({ variables: { email: email } })
    };
    return (<div className="min-h-screen bg-gray-100 flex flex-col justify-center p-4">
        <Form className="max-w-sm " {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[{ type: 'email', required: true }]}
                tooltip={{ title: 'A validating link will be provided to your email. Click the link to login', icon: <InfoCircleOutlined /> }}
                hasFeedback
                validateStatus={called ? loading ? 'validating' : data && data.sendMagicLink.status ? 'success' : 'error' : null}
            >
                <Input className="bg-gray-100 " />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button className="items-center bg-green-600 border-none hover:bg-green-400" type="primary" icon={<MailOutlined className="align-text-top" />} >
                    Send Magic Link
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button className="items-center bg-blue-600 border-none hover:bg-blue-400" type="primary" htmlType="submit" icon={<FacebookFilled className="align-text-top" />} onClick={() => Router.replace('/auth/facebook')} >
                    Login with Facebook
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button className="items-center bg-red-600 border-none hover:bg-red-400" type="primary" htmlType="submit" icon={<GoogleOutlined className="align-text-top" />} onClick={() => Router.replace('/auth/google')}>
                    Login with Google
                </Button>
            </Form.Item>
        </Form>

    </div >)
}
export default Login;