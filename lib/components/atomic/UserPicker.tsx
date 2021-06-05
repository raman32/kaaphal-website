import { message, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useGetUsersQuery, User, UserRole } from '../../../gql';
import { parseFullName } from '../../common/helpers/parse';
import { UserPopover } from './UserPopover';

export default function UserPicker(props: React.ComponentProps<typeof Select> & { roles?: UserRole[] }): JSX.Element {
    const [searchText, setSearchText] = useState('')
    const { data, loading, error } = useGetUsersQuery({ variables: { first: 20, contains: searchText, roles: props.roles }, ssr: false })
    const handleSearch = (value: string) => {
        setSearchText(value);
    }
    useEffect(() => {
        if (error) message.error('Something went wrong')
    }, [error])

    return <Select
        placeholder="Select User"
        showSearch
        onSearch={handleSearch}
        {...props}
        loading={loading}
        filterOption={false}
    >
        {data && !loading ? data.getUsers.edges.map(({ node }, index) => <Select.Option value={node.id} key={index}><UserPopover user={node as User}>{parseFullName(node.firstName, '', node.lastName)}</UserPopover></Select.Option>) : null}
    </Select>
}