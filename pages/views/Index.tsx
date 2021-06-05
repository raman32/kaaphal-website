import { Button } from 'antd'
import { NextPage, NextPageContext } from 'next'
import { useState } from 'react'
import { useGetPostQuery } from '../../gql'
import DefaultLayout from '../layouts/default';
// The component's props type
type PageProps = {
    title: string
}

// extending the default next context type
type PageContext = NextPageContext & {
    query: PageProps
}

// react component
const Page = ({ title }: PageProps): JSX.Element => {
    const [id, setId] = useState('')
    const { data, loading, error } = useGetPostQuery({ variables: { id: id } })
    console.log(data, loading, error)
    return (
        <div className="bg-white">
            Hello From the Other side

        </div>
    )
}

Page.getLayout = (page: JSX.Element): React.ReactNode => <DefaultLayout>{page}</DefaultLayout>
// assigning the initial props to the component's props
Page.getInitialProps = (ctx: PageContext) => {
    return {
        title: ctx.query.title,
    }
}

export default Page