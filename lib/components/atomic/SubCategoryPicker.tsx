import { Select } from 'antd';
import React from 'react';
import { useGetCategoryQuery } from '../../../gql';

export default function SubCategoryPicker(props: React.ComponentProps<typeof Select> & { categoryId: string }): JSX.Element {
    const { data } = useGetCategoryQuery({ variables: { id: props.categoryId } })
    return <Select
        placeholder="Select Sub Category"
        {...props}
    >
        {data ? data.getCategory.subCategories.map((subCategory, index) => <Select.Option value={subCategory.id} key={index}>{subCategory.name}</Select.Option>) : null}
    </Select>
}