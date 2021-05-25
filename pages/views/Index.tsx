import { Button } from 'antd'
import { NextPage, NextPageContext } from 'next'
import '/node_modules/antd/dist/antd.css'

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
    return (
        <div>
            <h1>{title}</h1>
            <div> Hello From the Other Side!!!!</div>
            <Button type="primary" >button</Button>
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