import React from 'react';
import { defualtLayout } from '../../layouts/default';
import { Alert, Spin } from 'antd';
import { isServer } from '../../../lib/apollo';
import { useGetLoksewaMockCategoriesQuery } from '../../../gql';
import Link from 'next/link';
import { useRouter } from 'next/router'
const LoksewaMock = (): JSX.Element => {
    const { data } = useGetLoksewaMockCategoriesQuery()
    if (!isServer()) {
        const router = useRouter()
        if (router.asPath !== '/loksewa/mock') {
            router.push(router.asPath)
        }
    }
    if (!data) return <div className="flex flex-col w-full justify-center items-center"> <Spin /> Loading</div>
    return (
        <div className="w-full px-4 sm:px-8" role="application">
            <h1 className="text-xl my-4 text-center">Kaaphal™ Mock Test for Loksewa Nepal</h1>
            <h5 className="text-center mb-4"> Select a type of set:</h5>
            <div className="flex flex-row flex-wrap ">
                {data.getLoksewaMockCategories ? data.getLoksewaMockCategories.map((category) => <Link key={category.id} href="/loksewa/mock/[loksewaCategoryId]" as={'/loksewa/mock/' + category.id} >
                    <div className=" shadow hover:shadow-lg px-8 py-4 my-4 mx-4 w-80 cursor-pointer text-center">
                        <div dangerouslySetInnerHTML={{ __html: category.titleNP }} />
                        <div dangerouslySetInnerHTML={{ __html: category.title }} />
                    </div>
                </Link>) : <Alert type="error" message=" Something Went Wrong" />}
            </div>
        </div >)
}

LoksewaMock.getLayout = defualtLayout;

// export const getStaticProps: GetStaticProps = async () => {
//     const data = await clientForStaticRendering.query({ query: GetLoksewaMockCategoriesDocument }) as GetLoksewaMockCategoriesQueryResult
//     return {
//         props: {
//             categories: data.data.getLoksewaMockCategories
//         },
//     }
// }

export default LoksewaMock;