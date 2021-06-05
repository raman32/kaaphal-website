import { Select } from 'antd';
import React from 'react';
import { useGetCategoriesQuery } from '../../../gql';

export default function CategoryPicker(props: React.ComponentProps<typeof Select>): JSX.Element {
    const { data } = useGetCategoriesQuery()
    return <Select
        placeholder="Select Category"
        {...props}
    >
        {data ? data.getCategories.map((category, index) => <Select.Option value={category.id} key={index}>{category.name}</Select.Option>) : null}
    </Select>
}