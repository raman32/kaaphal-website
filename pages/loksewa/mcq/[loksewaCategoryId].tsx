import { Button, Pagination, Radio, Space, Spin } from 'antd';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { GetLoksewaCategoriesDocument, GetLoksewaCategoriesQueryResult, LoksewaQuestion, useGetQuestionsQuery } from '../../../gql';
import { clientForStaticRendering } from '../../../lib/apollo';
import LoksewaCategoryPicker from '../../../lib/components/atomic/LoksewaCategoryPicker';
import { TickIcon } from '../../../lib/components/Icons/Index';
import { Question } from '../../../lib/components/Question/Index';
import { useScrollQuestion } from '../../../lib/hooks/useScroll';
import DefaultLayout, { defualtLayout } from '../../layouts/default';

const LoksewaMCQQuestions = ({ params }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
    const router = useRouter();
    if (router.isFallback) return <div className="flex flex-col h-full justify-center items-center"> <Spin /> Loading </div>
    const [next, prev, gotoPage, page, { data, error, loading }] = useScrollQuestion({ limit: 10, categoryId: params.loksewaCategoryId })
    return (
        <div className="w-full px-4 sm:px-8" role="application">
            <h1 className="text-xl my-4 text-center">Loksewa Multiple Choice Question</h1>
            <h4>Category: <LoksewaCategoryPicker value={params.loksewaCategoryId} className="w-56 mx-4" onChange={(value) => { router.push('/loksewa/mcq/' + value) }} /></h4>
            <div className="text-right my-4">
                {data && <Pagination defaultCurrent={1} total={data.getQuestions.totalCount} pageSize={10} showSizeChanger={false} current={page + 1} onChange={(page_) => {
                    gotoPage(page_ - 1);
                }} />}
                <h4>Page: {typeof page === 'number' ? page + 1 : null} / {data ? Math.ceil(data.getQuestions.totalCount / 10) : null}</h4></div>

            {data && data.getQuestions.edges.map((edge, index) => <Question key={edge.node.id} {...edge.node as LoksewaQuestion} questionNumber={page * 10 + index + 1} />)}
            <div className="text-right my-4">
                {data && <Pagination defaultCurrent={1} total={data.getQuestions.totalCount} pageSize={10} showSizeChanger={false} current={page + 1} onChange={(page_) => {
                    gotoPage(page_ - 1);
                }} />}
                <h4>Page: {typeof page === 'number' ? page + 1 : null} / {data ? Math.ceil(data.getQuestions.totalCount / 10) : null}</h4></div>
        </div >)
}

LoksewaMCQQuestions.getLayout = defualtLayout


export const getStaticPaths: GetStaticPaths = async () => {
    const data = await clientForStaticRendering.query({ query: GetLoksewaCategoriesDocument }) as GetLoksewaCategoriesQueryResult
    const paths = data.data.getLoksewaCategories.map((categories) => ({
        params: { loksewaCategoryId: categories.id },
    }))
    return { paths, fallback: false }
}
export default LoksewaMCQQuestions;


export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {
            params: params
        },
    }
}