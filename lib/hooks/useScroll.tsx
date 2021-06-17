import { useCallback, useEffect, useState } from 'react';
import { GetPostsQueryResult, GetPostsQueryVariables, GetQuestionsQueryResult, GetQuestionsQueryVariables, useGetPostsQuery, useGetQuestionsQuery } from '../../gql';
import { skipper } from '../accessToken';

export function useScrollQuestion({ limit, ...variables }: GetQuestionsQueryVariables & { limit: number }): [() => void, () => void, (page: number) => void, number, GetQuestionsQueryResult] {
    const [startCursor, setStartCursor] = useState('');
    const [endCursor, setEndCursor] = useState('');
    const [page, setPage] = useState(0);
    console.log(variables)
    const result = useGetQuestionsQuery({ variables: { ...variables, first: limit }, skip: skipper(), ssr: false });
    const { data, refetch } = result;
    useEffect(() => {
        if (data) {
            setStartCursor(data.getQuestions.pageInfo.endCursor);
            setEndCursor(data.getQuestions.pageInfo.startCursor)
        }
    }, [data])

    const next = useCallback(async () => {
        if (data.getQuestions.pageInfo.hasNextPage) {
            await refetch({ ...variables, after: startCursor, first: limit, before: null, last: null })
            setPage(prev => prev + 1)
        }

    }, [startCursor])
    const prev = useCallback(async () => {
        if (data.getQuestions.pageInfo.hasPreviousPage) {
            await refetch({ ...variables, before: endCursor, last: limit, after: null, first: null })
            setPage(prev => prev - 1)
        }

    }, [endCursor])

    const gotoPage = useCallback(async (page_) => {
        await refetch({ ...variables, after: null, first: limit, before: null, last: null, skip: page_ * limit })
        setPage(page_);
    }, [])
    return [next, prev, gotoPage, page, result];
}

export function useScrollPost({ limit, ...variables }: GetPostsQueryVariables & { limit: number }): [() => void, () => void, (page: number) => void, number, GetPostsQueryResult] {
    const [startCursor, setStartCursor] = useState('');
    const [endCursor, setEndCursor] = useState('');
    const [page, setPage] = useState(0);
    const result = useGetPostsQuery({ variables: { ...variables, first: limit }, skip: skipper(), ssr: false });
    const { data, refetch } = result;
    useEffect(() => {
        if (data) {
            setStartCursor(result.data.getPosts.pageInfo.endCursor);
            setEndCursor(result.data.getPosts.pageInfo.startCursor)
        }
    }, [data])
    const next = useCallback(async () => {
        if (startCursor && data.getPosts.pageInfo.hasNextPage) {
            await refetch({ ...variables, after: startCursor, first: limit, before: undefined, last: undefined })
            setPage(prev => prev + 1)
        }
        return;
    }, [startCursor])
    const prev = useCallback(async () => {
        if (endCursor && data.getPosts.pageInfo.hasPreviousPage) {
            await refetch({ ...variables, before: endCursor, last: limit, after: undefined, first: undefined })
            setPage(prev => prev - 1)
        }
        return;
    }, [endCursor])

    const gotoPage = useCallback(async (page_) => {
        await refetch({ ...variables, after: undefined, first: limit, before: undefined, last: undefined, skip: page_ * limit })
        setPage(page_);
    }, [])
    return [next, prev, gotoPage, page, result];
}