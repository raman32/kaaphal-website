import { Select } from 'antd';
import { PostStatus } from '../../../gql';

export function PostStatusPicker(props: React.ComponentProps<typeof Select>): JSX.Element {
    return <Select placeholder="Select status" className="w-52" {...props} >
        <Select.Option value={PostStatus.Draft}>Draft</Select.Option>
        <Select.Option value={PostStatus.Unverified}>Unverified</Select.Option>
        <Select.Option value={PostStatus.Verified}>Verified</Select.Option>
        <Select.Option value={PostStatus.Published}>Published</Select.Option>
        <Select.Option value={PostStatus.Commented}>Commented</Select.Option>
        <Select.Option value={PostStatus.Hidden}>Hidden</Select.Option>
        <Select.Option value={PostStatus.Blocked}>Blocked</Select.Option>
    </Select>
}