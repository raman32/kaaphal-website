import React from 'react';
import { defualtLayout } from '../../layouts/default';
import { Alert, Divider, Spin } from 'antd';
import { isServer } from '../../../lib/apollo';
import { useGetLoksewaCategoriesQuery } from '../../../gql';
import Link from 'next/link';
import { useRouter } from 'next/router'
const LoksewaMCQ = (): JSX.Element => {
    const { data } = useGetLoksewaCategoriesQuery();
    if (!isServer()) {
        const router = useRouter()
        if (router.asPath !== '/loksewa/mcq') {
            router.push(router.asPath)
        }
    }
    if (!data) return <div className="flex flex-col w-full justify-center items-center"> <Spin /> Loading</div>
    return (
        <div className="w-full px-4 sm:px-8" role="application">
            <h1 className="text-xl my-4 text-center">Loksewa Multiple Choice Question</h1>
            <h5 className="text-center mb-4"> Select Basic Category</h5>
            <div className="flex flex-row flex-wrap ">
                {data.getLoksewaCategories ? data.getLoksewaCategories.map((category, index) => index < 11 ? <Link href="/loksewa/mcq/[loksewaCategoryId]" as={'/loksewa/mcq/' + category.id} ><div key={category.id} className="shadow hover:shadow-lg px-8 py-4 my-2 mx-4 w-80 cursor-pointer ">
                    <div>{category.titleNP}</div>
                    <div>{category.title}</div>
                </div></Link> : null) : <Alert type="error" message=" Something Went Wrong" />}
            </div>
            <Divider />
            <h5 className="text-center mb-4"> Select Other Category (Techincal and State Owned Enterprises)</h5>
            <div className="flex flex-row flex-wrap">
                {data.getLoksewaCategories ? data.getLoksewaCategories.map((category, index) => index >= 11 ? <div key={category.id} className="shadow hover:shadow-lg px-8 py-4 my-2 mx-4 w-80 cursor-pointer ">
                    <div>{category.titleNP}</div>
                    <div>{category.title}</div>
                </div> : null) : <Alert type="error" message=" Something Went Wrong" />}
            </div>

        </div >)
}

LoksewaMCQ.getLayout = defualtLayout;

// export const getStaticProps: GetStaticProps = async () => {
//     const data = await clientForStaticRendering.query({ query: GetLoksewaCategoriesDocument }) as GetLoksewaCategoriesQueryResult
//     return {
//         props: {
//             categories: data.data.getLoksewaCategories
//         },
//     }
// }

export default LoksewaMCQ;