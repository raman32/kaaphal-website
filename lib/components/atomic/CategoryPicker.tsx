import { Select } from 'antd';
import React from 'react';
import { PostType, useGetCategoriesQuery } from '../../../gql';

export default function CategoryPicker(props: React.ComponentProps<typeof Select> & { postType: PostType }): JSX.Element {
    const { data } = useGetCategoriesQuery()
    return <Select
        placeholder="Select Category"
        {...props}
    >
        {data ? data.getCategories.map((category, index) => category.parentType === props.postType ? <Select.Option value={category.id} key={index}>{category.name}</Select.Option> : null) : null}
    </Select>
}