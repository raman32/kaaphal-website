import { Button, DatePicker, Form, Pagination, Tabs } from 'antd';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { NextPageContext } from 'next'
import { useEffect } from 'react'
import { PostType, Tag, useGetCategoriesQuery, User } from '../gql'
import CountryPicker from '../lib/components/atomic/CountryPicker';
import ScholarshipLevelPicker from '../lib/components/atomic/ScholarshipLevelPicker';
import { FeedIcon, SearchIcon } from '../lib/components/Icons/Index';
import PostCard from '../lib/components/PostCard/Index';
import { useInfinitePostScroll } from '../lib/hooks/useInfiniteScroll';
import { useScrollPost } from '../lib/hooks/useScroll';
import useStore from '../store/storeProvider';
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
    const store = useStore();
    const { data: categories } = useGetCategoriesQuery()
    const [next, prev, gotoPage, page, { data, error, loading }] = useScrollPost({ limit: 5, type: PostType.Articles })
    return (
        <div className="w-full">
            <Tabs defaultActiveKey="-1" type="card" size="middle" className='mb-4' >
                < Tabs.TabPane tab="All" key="-1" >
                    {data && data.getPosts.edges.map(edge => <PostCard
                        key={edge.node.id}
                        loading={loading}
                        id={edge.node.id}
                        slug={edge.node.slug}
                        title={edge.node.title}
                        author={edge.node.user as User}
                        excerpt={edge.node.excerpt ? edge.node.excerpt : edge.node.body}
                        reactions={edge.node.reactions}
                        tags={edge.node.tags as Tag[]}
                        comments={0}
                        flags={0}
                        image="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />)}

                    {data && <Pagination defaultCurrent={1} total={data.getPosts.totalCount} pageSize={10} showSizeChanger={false} current={page + 1} onChange={(page_) => {
                        gotoPage(page_ - 1);
                    }} />}
                </Tabs.TabPane>
                {categories && categories.getCategories.map((category, index) => category.parentType === PostType.Articles ?
                    <Tabs.TabPane tab={category.name} key={index} >
                    </Tabs.TabPane> : null
                )}
            </Tabs>

        </div >
    )
}

Page.getLayout = defualtLayout;

export default observer(Page)