import { Button, DatePicker, Form, Pagination } from 'antd';
import { observer } from 'mobx-react';
import { NextPageContext } from 'next'
import { PostType, Tag, User } from '../gql'
import CountryPicker from '../lib/components/atomic/CountryPicker';
import ScholarshipLevelPicker from '../lib/components/atomic/ScholarshipLevelPicker';
import { FeedIcon, SearchIcon } from '../lib/components/Icons/Index';
import PostCard from '../lib/components/PostCard/Index';
import { useScrollPost } from '../lib/hooks/useScroll';
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
    const [next, prev, gotoPage, page, { data, error, loading }] = useScrollPost({ limit: 5, type: PostType.Scholarships })
    return (
        <div className="w-full">
            <div className="my-10 ">
                <div className="mx-4 text-lg my-2 "><SearchIcon className="align-text-top" /> SCHOLARSHIP FINDER</div>
                <div className=" flex flex-row ">
                    <Form layout="inline" >
                        <Form.Item name="country" label="Country or Regions" className="w-80 mx-4 my-4">
                            <CountryPicker

                                allowClear
                            />
                        </Form.Item>
                        <Form.Item name="startsAt" label="Starts" className="w-60 mx-4 my-4">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="deadlineAt" label="Deadline" className="w-60 mx-4 my-4">
                            <DatePicker />
                        </Form.Item>
                        <Form.Item name="level" label="Level" className="w-60 mx-4 my-4" >
                            <ScholarshipLevelPicker

                                allowClear
                            />
                        </Form.Item>
                        <Form.Item className="w-10 mx-4 my-4"  >
                            <Button type="primary" htmlType="submit"> Filter </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className="my-10 max-w-4xl">
                <div className="mx-4 text-lg my-2 "> <FeedIcon className="align-text-top" /> SCHOLARSHIP RESULTS </div>
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