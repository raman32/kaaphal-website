import { Button, Card, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta';
import { NextPage, NextPageContext } from 'next'
import { useState } from 'react'
import { useGetPostQuery } from '../../gql'
import { HotShotIcon } from '../../lib/components/Icons/Index';
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
        <div>
            <div className="my-10">
                <Typography className="mx-4 text-lg my-2 "><HotShotIcon className="align-text-top" /> HOT SHOT</Typography>
                <div className="flex flex-row  ">
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        className=" mx-4"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        className=" mx-4"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        className=" mx-4"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        className=" mx-4"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        className=" mx-4"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </div>
            </div>
        </div>
    )
}

// eslint-disable-next-line react/display-name
Page.getLayout = (page: JSX.Element): React.ReactNode => <DefaultLayout>{page}</DefaultLayout>
// assigning the initial props to the component's props
Page.getInitialProps = (ctx: PageContext) => {
    return {
        title: ctx.query.title,
    }
}

export default Page