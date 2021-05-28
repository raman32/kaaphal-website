import { Button } from 'antd'
import { NextPage, NextPageContext } from 'next'
import { useState } from 'react'
import { useGetPostQuery } from '../../gql'

// The component's props type
type PageProps = {
    title: string
}

// extending the default next context type
type PageContext = NextPageContext & {
    query: PageProps
}

// react component
const Page: NextPage<PageProps> = ({ title }) => {
    const [id, setId] = useState('')
    const { data, loading, error } = useGetPostQuery({ variables: { id: id } })
    console.log(data, loading, error)
    return (
        <div>
            <h1>{title}</h1>
            <div className="hover:bg-gray-500"> Hello From the Other Side!!!!</div>
            <Button type="primary" onClick={() => setId('ckp4ace3o00006j2f1ol45n2h')} >button</Button>

            <div></div>
        </div>
    )
}

// assigning the initial props to the component's props
Page.getInitialProps = (ctx: PageContext) => {
    return {
        title: ctx.query.title,
    }
}

export default Page