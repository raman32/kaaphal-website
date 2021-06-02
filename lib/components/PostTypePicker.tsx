import { Select } from 'antd';
import React from 'react';
import { PostType } from '../../gql';

export const postTypes = [
    { value: PostType.Articles, name: 'Article' },
    { value: PostType.Information, name: 'Information' },
    { value: PostType.Loksewa, name: 'Loksewa' },
    { value: PostType.Scholarships, name: 'Scholarships' },
];

export default function PostTypePicker(props: React.ComponentProps<typeof Select>): JSX.Element {
    return <Select
        placeholder="Select Post Type"
        {...props}
    >
        {postTypes.map((postType, index) => <Select.Option value={postType.value} key={index}>{postType.name}</Select.Option>)}
    </Select>
}