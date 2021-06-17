import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta';
import { observer } from 'mobx-react';
import { NextPageContext } from 'next'
import { useEffect } from 'react'
import { User } from '../gql'
import { FeedIcon, HotShotIcon } from '../lib/components/Icons/Index';
import PostCard from '../lib/components/PostCard/Index';
import { useInfinitePostScroll } from '../lib/hooks/useInfiniteScroll';
import { defualtLayout } from './layouts/default';
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
    const [next, prev, data, loading] = useInfinitePostScroll({ limit: 5, })
    useEffect(() => {
        let observer
        if (data && data.length && !loading) {
            const options = {
                root: null,
                threshold: 1
            }
            observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    next();
                }

            }, options);
            observer.observe(document.getElementById(data[data.length - 1].node.id))
        }
        return () => {
            observer && observer.disconnect(document.getElementById(data[data.length - 1].node.id)); // *** Use the same element
        }
    }, [data, loading, next])
    return (
        <div className="w-full">
            <div className="my-10 ">
                <div className="mx-4 text-lg my-2 "><HotShotIcon className="align-text-top" /> HOT SHOT</div>
                <div className=" flex flex-row overflow-x-scroll overflow-y-hidden my-4">
                    <Card
                        hoverable
                        className=" mx-4 w-60 h-60"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        className=" mx-4 w-60 h-60"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        className=" mx-4 w-60 h-60"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        className=" mx-4 w-60 h-60"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                    <Card
                        hoverable
                        className=" mx-4 w-60 h-60"
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                        <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                </div>
            </div>
            <div className="my-10 max-w-4xl">
                <div className="mx-4 text-lg my-2 "> <FeedIcon className="align-text-top" /> PESONALISED FEED </div>
                <div id="post-scroll-area">
                    {data && data.map(edge => <div key={edge.node.id} id={edge.node.id}><PostCard
                        loading={loading}
                        id={edge.node.id}
                        slug={edge.node.slug}
                        title={edge.node.title}
                        author={edge.node.user as User}
                        excerpt={edge.node.excerpt ? edge.node.excerpt : edge.node.body}
                        reactions={edge.node.reactions}
                        tags={edge.node.tags}
                        comments={0}
                        flags={0}
                        image="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    /></div>)}
                </div>
            </div>
        </div >
    )
}

Page.getLayout = defualtLayout;

export default observer(Page)