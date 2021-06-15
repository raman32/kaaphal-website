import { Divider, Spin } from 'antd';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { GetLoksewaMockCategoriesDocument, GetLoksewaMockCategoriesQueryResult, MockSetType, useGetLoksewaMockCategoriesQuery, useGetMockCategoryQuery, useGetMockSetsQuery } from '../../../gql';
import { clientForStaticRendering } from '../../../lib/apollo';
import { DollorIcon } from '../../../lib/components/Icons/Index';
import { defualtLayout } from '../../layouts/default';

const LoksewaMCQQuestions = ({ params }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
    const router = useRouter();
    const { data: mockCategory } = useGetMockCategoryQuery({ variables: { categoryId: params.mockCategoryId } })
    const { data, error, loading } = useGetMockSetsQuery({ variables: { categoryId: params.mockCategoryId } })
    if (router.isFallback) return <div className="flex flex-col h-full justify-center items-center"> <Spin /> Loading </div>
    //const [next, prev, gotoPage, page, { data, error, loading }] = useScrollQuestion({ limit: 10, categoryId: params.loksewaCategoryId })
    return (
        <div className="w-full px-4 sm:px-8 text-center" role="application">
            <h1 className="text-xl my-4 text-center">Kaaphal™ Mock Test (Public Service Commision Examination, Loksewa of Nepal)</h1>
            {mockCategory ? <div> <h2 className="my-4 " dangerouslySetInnerHTML={{ __html: mockCategory.getMockCategory.titleNP }}></h2>
                <h2 className="my-4" dangerouslySetInnerHTML={{ __html: mockCategory.getMockCategory.title }}></h2> </div> : null}
            <Divider />
            {data ? data.getMockSets.map((set, index) => <Link href='/loksewa/mock/set/[setId]' as={'/loksewa/mock/set/' + set.id} key={index + 1}>
                <div className="shadow hover:shadow-lg mx-auto my-4 px-4 py-4 justify-around max-w-sm cursor-pointer flex flex-row" role="Button" >
                    <div className="text-sm bg-red-100 rounded-full px-2 py-1 w-20 text-center text-black">
                        {set.type}
                    </div>
                    <div className="">Set {index + 1}
                    </div>
                    {set.type === MockSetType.Premium ?
                        <DollorIcon className="align-text-top" /> :
                        <div className="w-4" />}
                </div>
            </Link>) :
                <div className=" flex flex-col h-full justify-center items-center"> <Spin /> Loading </div>}
        </div >)
}

LoksewaMCQQuestions.getLayout = LoksewaMCQQuestions.getLayout = defualtLayout


export const getStaticPaths: GetStaticPaths = async () => {
    const data = await clientForStaticRendering.query({ query: GetLoksewaMockCategoriesDocument }) as GetLoksewaMockCategoriesQueryResult
    const paths = data.data.getLoksewaMockCategories.map((categories) => ({
        params: { mockCategoryId: categories.id },
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