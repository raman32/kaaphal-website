import { Layout, Menu } from 'antd';

import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useState } from 'react';
import { UserOutlined, LaptopOutlined, NotificationOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { ArticleIcon, InformationIcon, NotificationIcon, ScholarshipIcon, UserIcon } from '../../lib/components/Icons/Index';
const { Header, Content, Footer, Sider } = Layout;
interface Props {
    children: React.ReactNode
}

function DefaultLayout({ children }: Props): JSX.Element {
    const [collapsed, setCollapased] = useState(true);
    return (
        <Layout className=" bg-white">
            <Header className=" bg-white flex flex-row">
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    id: 'navigation-drawer-button',
                    className: 'md:hidden my-auto flex-1 text-left',
                    onClick: () => setCollapased(prev => !prev),
                })}
                <div className="float-left my-auto md:h-13 flex-1 text-center" >
                    <img src='https://kaaphal.com/wp-content/uploads/2020/09/cropped-Wide-Kp.png' className="h-12" />
                </div>
                <Menu mode="horizontal" defaultSelectedKeys={['2']} className="hidden md:block ">
                    <SubMenu key="sub1" icon={<ArticleIcon />} title="Article">
                        <Menu.Item key="11">option1</Menu.Item>
                        <Menu.Item key="12">option2</Menu.Item>
                        <Menu.Item key="13">option3</Menu.Item>
                        <Menu.Item key="14">option4</Menu.Item>
                    </SubMenu>

                    <Menu.Item key="scholarship" icon={<ScholarshipIcon />}>
                        Scholarship
                    </Menu.Item>
                    <SubMenu key="sub3" icon={<ScholarshipIcon />} title="Loksewa">
                        <Menu.Item key="31">option1</Menu.Item>
                        <Menu.Item key="32">option2</Menu.Item>
                        <Menu.Item key="33">option3</Menu.Item>
                        <Menu.Item key="34">option4</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<InformationIcon />} title="Information">
                        <Menu.Item key="41">option1</Menu.Item>
                        <Menu.Item key="42">option2</Menu.Item>
                        <Menu.Item key="43">option3</Menu.Item>
                        <Menu.Item key="44">option4</Menu.Item>
                    </SubMenu>
                </Menu>
                <Menu mode="horizontal" className="flex-1 text-right ">
                    <SubMenu key="notification" icon={<NotificationIcon />} >
                    </SubMenu >
                    <SubMenu icon={<UserIcon />} >
                        <Menu.Item key="profile">Profile</Menu.Item>
                        <Menu.Item key="settings">Settings</Menu.Item>
                        <Menu.Item key="logout  ">Logout</Menu.Item>
                    </SubMenu>
                </Menu>

            </Header>
            <Layout>
                <Content >
                    <Sider trigger={null} collapsible={true} collapsed={collapsed} collapsedWidth={0} className="md:hidden absolute" theme="light"  >
                        <Menu mode="inline" defaultSelectedKeys={['2']} >
                            <SubMenu key="sub1" icon={<ArticleIcon />} title="Article">
                                <Menu.Item key="11">option1</Menu.Item>
                                <Menu.Item key="12">option2</Menu.Item>
                                <Menu.Item key="13">option3</Menu.Item>
                                <Menu.Item key="14">option4</Menu.Item>
                            </SubMenu>

                            <SubMenu key="sub2" icon={<ScholarshipIcon />} title="Scholarship">
                                <Menu.Item key="21">option1</Menu.Item>
                                <Menu.Item key="22">option2</Menu.Item>
                                <Menu.Item key="23">option3</Menu.Item>
                                <Menu.Item key="24">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" icon={<ScholarshipIcon />} title="Loksewa">
                                <Menu.Item key="31">option1</Menu.Item>
                                <Menu.Item key="32">option2</Menu.Item>
                                <Menu.Item key="33">option3</Menu.Item>
                                <Menu.Item key="34">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<InformationIcon />} title="Information">
                                <Menu.Item key="41">option1</Menu.Item>
                                <Menu.Item key="42">option2</Menu.Item>
                                <Menu.Item key="43">option3</Menu.Item>
                                <Menu.Item key="44">option4</Menu.Item>
                            </SubMenu>
                        </Menu>

                    </Sider>
                    <Content style={{ padding: '0 50px' }} className="container  bg-white mt-4 mx-auto block  min-h min-h-screen">
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Copyright Kaaphal Inc.
                     </Footer>
                </Content>

            </Layout >
        </Layout>)
}
export default DefaultLayout;