import { Alert, Divider, message, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useGetLoksewaCategoriesQuery } from '../../gql';
import DefaultLayout from '../layouts/default';

const LoksewaMCQQuestions = (): JSX.Element => {
    const { data, loading, error } = useGetLoksewaCategoriesQuery()
    useEffect(() => {
        if (error) message.error('Something went Wrong')
    }, [error])
    return (
        <div className="w-full px-4 sm:px-8" role="application">
            <h1 className="text-xl my-4 text-center">Loksewa Multiple Choice Question</h1>
            <h5 className="text-center mb-4"> Select Basic Category</h5>
            <div className="flex flex-row flex-wrap ">
                {data ? data.getLoksewaCategories.map((category, index) => index < 11 ? <div key={category.id} className="shadow hover:shadow-lg px-8 py-4 my-2 mx-4 w-80 cursor-pointer bg-white">
                    <div>{category.titleNP}</div>
                    <div>{category.title}</div>
                </div> : null) : loading ? <Spin></Spin> : <Alert type="error" message=" Something Went Wrong" />}
            </div>
            <Divider />
            <h5 className="text-center mb-4"> Select Other Category (Techincal and State Owned Enterprises)</h5>
            <div className="flex flex-row flex-wrap">
                {data ? data.getLoksewaCategories.map((category, index) => index >= 11 ? <div key={category.id} className="shadow hover:shadow-lg px-8 py-4 my-2 mx-4 w-80 cursor-pointer bg-white">
                    <div>{category.titleNP}</div>
                    <div>{category.title}</div>
                </div> : null) : loading ? <Spin></Spin> : <Alert type="error" message=" Something Went Wrong" />}
            </div>

        </div >)
}

// eslint-disable-next-line react/display-name
LoksewaMCQQuestions.getLayout = (page: JSX.Element): React.ReactNode => <DefaultLayout>{page}</DefaultLayout>
export default LoksewaMCQQuestions;