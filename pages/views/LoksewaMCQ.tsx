import { Alert, Divider } from 'antd';
import React from 'react';
import { GetLoksewaCategoriesDocument, useGetLoksewaCategoriesQuery } from '../../gql';
import DefaultLayout from '../layouts/default';
import { GetStaticProps } from 'next'
import { InferGetStaticPropsType } from 'next'
import { apolloClient } from '../../lib/apollo';
const LoksewaMCQ = ({ categories }: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element => {
    console.log(categories)
    return (
        <div className="w-full px-4 sm:px-8" role="application">
            <h1 className="text-xl my-4 text-center">Loksewa Multiple Choice Question</h1>
            <h5 className="text-center mb-4"> Select Basic Category</h5>
            <div className="flex flex-row flex-wrap ">
                {categories ? categories.map((category, index) => index < 11 ? <div key={category.id} className="shadow hover:shadow-lg px-8 py-4 my-2 mx-4 w-80 cursor-pointer bg-white">
                    <div>{category.titleNP}</div>
                    <div>{category.title}</div>
                </div> : null) : <Alert type="error" message=" Something Went Wrong" />}
            </div>
            <Divider />
            <h5 className="text-center mb-4"> Select Other Category (Techincal and State Owned Enterprises)</h5>
            <div className="flex flex-row flex-wrap">
                {categories ? categories.map((category, index) => index >= 11 ? <div key={category.id} className="shadow hover:shadow-lg px-8 py-4 my-2 mx-4 w-80 cursor-pointer bg-white">
                    <div>{category.titleNP}</div>
                    <div>{category.title}</div>
                </div> : null) : <Alert type="error" message=" Something Went Wrong" />}
            </div>

        </div >)
}

// eslint-disable-next-line react/display-name
LoksewaMCQ.getLayout = (page: JSX.Element): React.ReactNode => <DefaultLayout>{page}</DefaultLayout>

// This function gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
    // Call an external API endpoint to get posts
    const data = await apolloClient.query({ query: GetLoksewaCategoriesDocument, context: context })

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            categories: data,
        },
    }
}

export default LoksewaMCQ;