import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import Link from 'next/link'
const { Header, Content, Footer, Sider } = Layout;
interface Props {
    children: React.ReactNode
}
function AdminLayout({ children }: Props): JSX.Element {
    return (
        <Layout >
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                className="min-h-screen h-full"
            >
                <div className="rounded-full shadow-md w-20 h-20 bg-gray-300 mx-auto my-5"></div>
                <div className="text-lg text-white text-center">Howdy Admin!</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['10']}>
                    <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Article Management">
                        <Menu.Item key="1"><Link href='/admin/CreateArticle'>Create Article</Link></Menu.Item>
                        <Menu.Item key="2"><Link href='/admin/EditArticle'>Edit Article</Link></Menu.Item>
                        <Menu.Item key="3"><Link href='/admin/VerifyArticle'>Verify Article</Link></Menu.Item>
                        <Menu.Item key="4"><Link href='/admin/CreateArticleCategory'>Create Category</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub2" icon={<UserOutlined />} title="Loksewa">
                        <Menu.Item key="5"><Link href='/admin/CreateLoksewaSet'>Create Set</Link></Menu.Item>
                        <Menu.Item key="6"><Link href='/admin/CreateLoksewaQuestion'>Create Questions</Link></Menu.Item>
                        <Menu.Item key="7"><Link href='/admin/CreateLoksewaCategory'>Create Category</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub3" icon={<UserOutlined />} title="User Management">
                        <Menu.Item key="8"><Link href='/admin/UserManagement'>Show User Statistics</Link></Menu.Item>
                        <Menu.Item key="9"><Link href='/admin/CreateUser'>Create New User</Link></Menu.Item>
                        <Menu.Item key="10"><Link href='/admin/EditUser'>Edit User</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="11" icon={<UserOutlined />}>
                        <Link href='/admin'>Admin Profile</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Created with Ant Design and Braft Editor.  Copyright © Kapahal</Footer>
            </Layout>
        </Layout>)
}
export default AdminLayout;