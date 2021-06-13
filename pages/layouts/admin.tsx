import { Layout, Menu, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import useStore from '../../store/storeProvider';
import { useGetMeQuery, User } from '../../gql';
import { logout, skipper } from '../../lib/accessToken';
import Router from 'next/router';
import UserAvatar from '../../lib/components/atomic/UserAvatar';
const { Header, Content, Footer, Sider } = Layout;
interface Props {
    children: React.ReactNode
}
function AdminLayout({ children }: Props): JSX.Element {
    const [collapsed, setCollapased] = useState(true);
    const store = useStore();

    const { data, loading, error } = useGetMeQuery({ skip: skipper() },
    );
    useEffect(() => {
        if (data && !store.user) {
            store.login(data.me);
        }
    }, [data]);
    const onTriggerLogout = () => {
        localStorage.clear();
        logout();
        Router.push('/');
    };
    if (!data) return <div className="flex flex-col w-screen h-screen justify-center items-center"> <Spin /> Loading </div>
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
                <div className="text-center my-4">
                    <UserAvatar user={data.me as User} size={60} />
                    <div className="text-lg text-white">Howdy Admin!</div>
                </div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['11']}>
                    <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Article Management">
                        <Menu.Item key="1"><Link href='/admin/article/create'>Create Article</Link></Menu.Item>
                        <Menu.Item key="2"><Link href='/admin/article/manage'>Edit Article</Link></Menu.Item>
                        <Menu.Item key="3"><Link href='/admin/article/VerifyArticle'>Verify Article</Link></Menu.Item>
                        <Menu.Item key="4"><Link href='/admin/article/category'>Create Category</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub2" icon={<UserOutlined />} title="Loksewa">
                        <Menu.Item key="5"><Link href='/admin/loksewa/createSet'>Create Set</Link></Menu.Item>
                        <Menu.Item key="6"><Link href='/admin/loksewa/createQuestion'>Create Questions</Link></Menu.Item>
                        <Menu.Item key="12"><Link href='/admin/loksewa/manage'>Edit Questions</Link></Menu.Item>
                        <Menu.Item key="7"><Link href='/admin/loksewa/category'>Create Category</Link></Menu.Item>
                        <Menu.Item key="13"><Link href='/admin/loksewa/mockCategory'>Create Mock Category</Link></Menu.Item>

                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub3" icon={<UserOutlined />} title="User Management">
                        <Menu.Item key="8"><Link href='/admin/user/manage'>Show User Statistics</Link></Menu.Item>
                        <Menu.Item key="9"><Link href='/admin/user/create'>Create New User</Link></Menu.Item>
                        <Menu.Item key="10"><Link href='/admin/user/EditUser'>Edit User</Link></Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="11" icon={<UserOutlined />}>
                        <Link href='/admin/'>Admin Profile</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Content style={{ margin: '24px 16px 0' }}>
                    {children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Created with Ant Design and Braft Editor.  Copyright © Kapahal</Footer>
            </Layout>
        </Layout>)
}
export default AdminLayout;