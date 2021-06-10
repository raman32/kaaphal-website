import { Select } from 'antd';
import React from 'react';
import { useGetLoksewaMockCategoriesQuery } from '../../../gql';

export default function LoksewaMockCategoryPicker(props: React.ComponentProps<typeof Select>): JSX.Element {
    const { data } = useGetLoksewaMockCategoriesQuery()
    return <Select
        placeholder="Select Category"
        {...props}
    >
        {data ? data.getLoksewaMockCategories.map((category, index) => <Select.Option value={category.id} key={index}><div dangerouslySetInnerHTML={{ __html: category.title }} /></Select.Option>) : null}
    </Select>
}