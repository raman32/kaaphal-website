import { Select } from 'antd';
import React from 'react';
import { useGetLoksewaCategoriesQuery } from '../../../gql';

export default function LoksewaCategoryPicker(props: React.ComponentProps<typeof Select>): JSX.Element {
    const { data } = useGetLoksewaCategoriesQuery()
    return <Select
        placeholder="Select Category"
        {...props}
    >
        {data ? data.getLoksewaCategories.map((category, index) => <Select.Option value={category.id} key={index}>{category.title}</Select.Option>) : null}
    </Select>
}