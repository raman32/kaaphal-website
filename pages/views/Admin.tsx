import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { NextPage } from 'next';
import dynamic from 'next/dynamic'

const BraftEditor = dynamic(() => import('braft-editor'), {
    ssr: false
})
import 'braft-editor/dist/index.css'
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
const Admin: NextPage<Record<string, never>> = () => {
    const [editorState, setEditorState] = useState(null);
    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                className="h-full"
            >
                <div className="rounded-full shadow-md w-20 h-20 bg-gray-300 mx-auto my-5"></div>
                <div className="text-lg text-white text-center">Howdy Admin!</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['10']}>
                    <Menu.SubMenu key="sub1" icon={<UserOutlined />} title="Article Management">
                        <Menu.Item key="1">Create Article</Menu.Item>
                        <Menu.Item key="2">Edit Article</Menu.Item>
                        <Menu.Item key="3">Verify Article</Menu.Item>
                        <Menu.Item key="4">Create Category</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub2" icon={<UserOutlined />} title="Loksewa">
                        <Menu.Item key="5">Create Set</Menu.Item>
                        <Menu.Item key="6">Create Questions</Menu.Item>
                        <Menu.Item key="7">Create Category</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.SubMenu key="sub3" icon={<UserOutlined />} title="User Management">
                        <Menu.Item key="8">Show User Statistics</Menu.Item>
                        <Menu.Item key="9">Create New User</Menu.Item>
                        <Menu.Item key="10">Edit User</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="10" icon={<UserOutlined />}>
                        Admin Profile
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <BraftEditor value={editorState} language="en" onChange={setEditorState} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Created with Ant Design and Braft Editor.  Copyright © Kapahal</Footer>
            </Layout>
        </Layout>)
}
export default Admin;