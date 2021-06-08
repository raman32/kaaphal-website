import { useCallback, useEffect, useState } from 'react';
import { GetQuestionsQueryResult, GetQuestionsQueryVariables, useGetQuestionsQuery } from '../../gql';

export function useScrollQuestion({ limit, ...variables }: GetQuestionsQueryVariables & { limit: number }): [() => void, () => void, (page: number) => void, number, GetQuestionsQueryResult] {
    const [startCursor, setStartCursor] = useState('');
    const [endCursor, setEndCursor] = useState('');
    const [page, setPage] = useState(0);
    console.log(variables)
    const result = useGetQuestionsQuery({ variables: { ...variables, first: limit } });
    const { data, refetch } = result;
    useEffect(() => {
        if (data) {
            setStartCursor(data.getQuestions.pageInfo.startCursor);
            setEndCursor(data.getQuestions.pageInfo.endCursor)
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