import { Pagination } from 'antd';
import { observer } from 'mobx-react';
import { NextPageContext } from 'next'
import { PostType, Tag, useGetCategoriesQuery, User } from '../../gql'
import PostCard from '../../lib/components/PostCard/Index';
import { useScrollPost } from '../../lib/hooks/useScroll';
import { defualtLayout } from '../layouts/default';
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
    const { data: categories } = useGetCategoriesQuery()
    const [next, prev, gotoPage, page, { data, error, loading }] = useScrollPost({ limit: 5, type: PostType.Loksewa })
    return (
        <div className="w-full">
            <div className="my-10 ">
                <div className="mx-4 text-base my-2 flex flex-row ">
                    {categories ? categories.getCategories.map((category, index) => category.parentType === PostType.Loksewa ? <div className="w-60 shadow px-4 py-2 my-4 mx-4 border cursor-pointer border-gray-400 hover:shadow-lg hover:border-gray-200">{category.name}</div> : null) : null}
                </div>
            </div>
            <div className="my-10 max-w-4xl">
                <div id="post-scroll-area">
                    {data && data.getPosts.edges.map(edge => <div key={edge.node.id} id={edge.node.id}><PostCard
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
                    /></div>)}

                    {data && <Pagination defaultCurrent={1} total={data.getPosts.totalCount} pageSize={10} showSizeChanger={false} current={page + 1} onChange={(page_) => {
                        gotoPage(page_ - 1);
                    }} />}
                </div>
            </div>
        </div >
    )
}

Page.getLayout = defualtLayout;

export default observer(Page)