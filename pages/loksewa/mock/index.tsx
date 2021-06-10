import React from 'react';
import { defualtLayout } from '../../layouts/default';
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import { Alert, Divider } from 'antd';
import { clientForStaticRendering, isServer } from '../../../lib/apollo';
import { GetLoksewaMockCategoriesDocument, GetLoksewaMockCategoriesQueryResult } from '../../../gql';
import Link from 'next/link';
import { useRouter } from 'next/router'
const LoksewaMock = ({ categories }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
    if (!isServer()) {
        const router = useRouter()
        if (router.asPath !== '/loksewa/mock') {
            router.push(router.asPath)
        }
    }
    return (
        <div className="w-full px-4 sm:px-8" role="application">
            <h1 className="text-xl my-4 text-center">Kaaphal™ Mock Test for Loksewa Nepal</h1>
            <h5 className="text-center mb-4"> Select a type of set:</h5>
            <div className="flex flex-row flex-wrap ">
                {categories ? categories.map((category) => <Link key={category.id} href="/loksewa/mock/[loksewaCategoryId]" as={'/loksewa/mock/' + category.id} >
                    <div className="shadow hover:shadow-lg px-8 py-4 my-2 mx-4 w-80 cursor-pointer bg-white text-center">
                        <div dangerouslySetInnerHTML={{ __html: category.titleNP }} />
                        <div dangerouslySetInnerHTML={{ __html: category.title }} />
                    </div>
                </Link>) : <Alert type="error" message=" Something Went Wrong" />}
            </div>
        </div >)
}

LoksewaMock.getLayout = defualtLayout;

export const getStaticProps: GetStaticProps = async () => {
    const data = await clientForStaticRendering.query({ query: GetLoksewaMockCategoriesDocument }) as GetLoksewaMockCategoriesQueryResult
    return {
        props: {
            categories: data.data.getLoksewaMockCategories
        },
    }
}

export default LoksewaMock;