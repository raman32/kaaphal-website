import { useCreateMeCommentMutation } from '../../../../gql';
import useStore from '../../../../store/storeProvider';
import { Comment, Form, Button, message } from 'antd';
import UserAvatar from '../../atomic/UserAvatar';
import TextArea from 'antd/lib/input/TextArea';
export function CommentInput({ postId, parentId, onSuccess, onError }: { postId: string, parentId?: string, onSuccess: () => void, onError: () => void }): JSX.Element {
    const store = useStore();
    const [createComment] = useCreateMeCommentMutation();
    const [form] = Form.useForm();
    return <Comment
        avatar={
            <UserAvatar user={store.user} />
        }
        content={
            <Form form={form} onFinish={(value) => createComment({ variables: { comment: { ...value, postId: postId, userId: store.user.id, parentId: parentId ? parentId : undefined } } })
                .then(data_ => {
                    if (data_.data) {
                        message.success('Commented Sucsessfully')
                        onSuccess();
                        form.resetFields();
                    }
                    else {
                        message.error('Could Not Comment Please try again Later')
                        onError();
                    }
                })}>
                <Form.Item name="body" rules={[{ required: true, message: 'Please input your comment' }]}>
                    <TextArea rows={1} autoSize />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        Add Comment
                    </Button>
                </Form.Item>
            </Form>
        }
    />

}