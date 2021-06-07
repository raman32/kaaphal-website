import { Alert, message, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useGetLoksewaCategoriesQuery } from '../../gql';
import DefaultLayout from '../layouts/default';

const LoksewaMCQ = (): JSX.Element => {
    const { data, loading, error } = useGetLoksewaCategoriesQuery()
    useEffect(() => {
        if (error) message.error('Something went Wrong')
    }, [error])
    return (
        <div className="w-full " role="application">
            <div className="flex flex-col items-center">
                <h1 className="text-xl my-4">Loksewa Multiple Choice Question</h1>
                <h5 className=""> Select Categories</h5>
                {data ? data.getLoksewaCategories.map(category => <div key={category.id} className="shadow hover:shadow-lg px-8 py-4 my-4 w-80 cursor-pointer bg-white">{category.title}</div>) : loading ? <Spin></Spin> : <Alert type="error" message=" Something Went Wrong" />}
            </div>
        </div >)
}

// eslint-disable-next-line react/display-name
LoksewaMCQ.getLayout = (page: JSX.Element): React.ReactNode => <DefaultLayout>{page}</DefaultLayout>
export default LoksewaMCQ;