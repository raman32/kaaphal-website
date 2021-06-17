import { NetworkStatus } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GetPostsQueryResult, GetPostsQueryVariables } from '../../gql';
import { useScrollPost } from './useScroll';

export function useInfinitePostScroll({ limit, ...variables }: GetPostsQueryVariables & { limit: number }): [() => void, () => void, any[], boolean] {
    const [next, prev, gotoPage, page, { data: data_, error, loading, previousData, networkStatus }] = useScrollPost({ ...variables, limit: limit, })
    const [data, setData] = useState([])
    //TODO HANDLE ERRORS
    //TODO HANDLE INTERSECTION OBSERVER HERE
    //TODO HANDLE MAX DATA AND PREV
    useEffect(() => {
        if (data_ && ((previousData && previousData.getPosts.pageInfo.startCursor !== data_.getPosts.pageInfo.startCursor) || !previousData)) {
            setData(data.concat(data_.getPosts.edges))
        }

    }, [data_, previousData])
    return [next, prev, data, loading || networkStatus === NetworkStatus.refetch]
}