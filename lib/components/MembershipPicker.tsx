import { Select } from 'antd';
import React from 'react';
import { MembershipType } from '../../gql';

export default function MembershipPicker(props: React.ComponentProps<typeof Select>): JSX.Element {
    return <Select placeholder="Select membership" {...props}>
        <Select.Option value={MembershipType.Bronze}>Bronze</Select.Option>
        <Select.Option value={MembershipType.Silver}>Silver</Select.Option>
        <Select.Option value={MembershipType.Gold}>Gold</Select.Option>
    </Select>
}