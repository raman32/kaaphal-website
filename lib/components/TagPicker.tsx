import { Button, message, Select, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useCreateTagMutation, useGetTagsQuery } from '../../gql';
import { activePollingInterval } from '../../utils/GlobalConstants';

export default function TagPicker(props: React.ComponentProps<typeof Select>): JSX.Element {
    const [searchText, setSearchText] = useState('')
    const createTagButton = useRef(null);
    const { data, loading, refetch, startPolling, stopPolling, } = useGetTagsQuery({ variables: { first: 20, contains: searchText }, ssr: false })
    const [createTag, { data: data_, loading: loading_, error: error_ }] = useCreateTagMutation()
    const handleSearch = (value: string) => {
        setSearchText(value);
    }
    const clearSearch = () => {
        setSearchText('');
        setTimeout(stopPolling, activePollingInterval * 3)
    }
    const handleCreateTag = () => {
        if (data.getTags.edges.some((edge) => edge.node.name === searchText)) return;
        createTag({ variables: { tag: { name: searchText } } })
    }
    useEffect(() => {
        if (error_) message.error('Something went wrong while creating tag');
        if (data_) {
            message.success('Succesfully created tag ' + data_.createTag.name)
            console.log(data_.createTag.id)
        }
    }, [error_, data_,])
    useEffect(() => {
        if (searchText) {
            startPolling(activePollingInterval);
        }
    }, [searchText])
    return <Select
        mode="multiple"
        showSearch
        placeholder="Pick Multiple tags"
        {...props}
        onSearch={handleSearch}
        loading={loading}
        onSelect={clearSearch}
        filterOption={false}
        onBlur={(event) => {
            if (event.relatedTarget !== createTagButton.current) clearSearch();
        }}
        dropdownRender={
            menu => (
                <div>
                    {menu}
                    { searchText ? <Button ref={createTagButton} type="link" onClick={handleCreateTag} loading={loading_}>Create a tag {searchText}</ Button> : null}
                </div>
            )
        }
    >
        {data ? data.getTags.edges.map((edge, index) => <Select.Option value={edge.node.id} key={index}>{edge.node.name}</Select.Option>) : loading ? <Spin /> : null}


    </Select>
}