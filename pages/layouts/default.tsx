import { BackTop, Badge, Divider, Layout, Menu, Switch } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React, { useEffect, useState } from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { ArticleIcon, InformationIcon, LoksewaIcon, NotificationIcon, ScholarshipIcon, UserIcon } from '../../lib/components/Icons/Index';
import { logout, skipper } from '../../lib/accessToken';
import Router from 'next/router';
import useStore from '../../store/storeProvider';
import { useGetMeQuery, User } from '../../gql';
import UserAvatar from '../../lib/components/atomic/UserAvatar';
import Link from 'next/link';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import Notification from '../../lib/components/Notification/Index';
const { Header, Content, Footer, Sider } = Layout;
interface Props {
    children: React.ReactNode
}

function DefaultLayout({ children }: Props): JSX.Element {
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
    console.log(store.isDark)
    return (
        <Layout className={clsx(store.isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-black')}>
            <Header className={clsx(store.isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-black border-solid border-gray-100 border-b-2', 'flex flex-row px-4')}  >
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'lg:hidden my-auto  mx-2 text-left min-w-max flex-1',
                    onClick: () => setCollapased(prev => !prev),
                })}
                <div className="my-auto lg:h-13 text-center min-w-max flex-1" >
                    <img src='https://kaaphal.com/wp-content/uploads/2020/09/cropped-Wide-Kp.png' className="h-9 mx-2" />
                </div>
                <Menu mode="horizontal" selectable={false} className={clsx(store.isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-black', 'hidden lg:block min-w-max flex-1 border-none')}>
                    <SubMenu level={1} icon={<ArticleIcon className="w-6 h-6" />} title="Article" className="px-2"  >
                        <SubMenu level={2} title="Literature"  >
                            <Menu.Item >Peom</Menu.Item>
                            <Menu.Item >Story</Menu.Item>
                            <Menu.Item >Essay</Menu.Item>
                            <Menu.Item >Gazal</Menu.Item>
                        </SubMenu>
                        <Menu.Item >Opinions</Menu.Item>
                        <Menu.Item >Science And Technology</Menu.Item>
                        <Menu.Item >Other</Menu.Item>
                    </SubMenu>

                    <Menu.Item icon={<ScholarshipIcon />} className="mx-2">
                        Scholarship
                    </Menu.Item>
                    <SubMenu icon={<LoksewaIcon />} title="Loksewa" className="mx-2" onTitleClick={() => Router.push('/loksewa')}>
                        <Menu.Item ><Link href="/loksewa/mcq">MCQ</Link></Menu.Item>
                        <Menu.Item ><Link href="/loksewa/mock">Mock Test</Link></Menu.Item>
                        <Menu.Item >Notices and Reading Materials</Menu.Item>
                        <Menu.Item >Syllabus and Other</Menu.Item>
                    </SubMenu>
                    <SubMenu icon={<InformationIcon />} title="Information" className="mx-2">
                        <Menu.Item >Special Info</Menu.Item>
                        <Menu.Item >Exams and Standarized Test</Menu.Item>
                        <Menu.Item >How to ?</Menu.Item>
                        <Menu.Item >Federal Nepal</Menu.Item>
                    </SubMenu>
                </Menu>
                <Menu mode="horizontal" selectable={false} className={clsx(store.isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-black', ' text-right min-w-min mx-2 flex-1 border-none ')} style={{ marginLeft: 0, marginRight: 0 }}>
                    {data && data.me ?
                        <>
                            <Notification />
                            <SubMenu icon={<UserAvatar user={data.me as User} />} style={{ marginLeft: 4, marginRight: 2 }} >
                                <Menu.Item > Dark mode &nbsp;<Switch onChange={(checked) => checked ? store.toggleDark() : store.toggleLight()} /></Menu.Item>
                                <Menu.Item ><Link href="/user/profile">Profile</Link></Menu.Item>
                                <Menu.Item >Settings</Menu.Item>
                                <Menu.Item onClick={onTriggerLogout}>Logout</Menu.Item>
                            </SubMenu>
                        </> :
                        <Menu.Item  > <Link href="/login"><span><span className="mr-2 hidden lg:inline">Login/Register</span> <span className="lg:hidden"><UserIcon /></span></span></Link></Menu.Item>
                    }
                </Menu>

            </Header>
            <Layout hasSider={true} className={clsx(store.isDark ? 'bg-black text-gray-100' : 'bg-white text-white')}>
                <Content >
                    <Sider trigger={null} collapsible={true} collapsed={collapsed} collapsedWidth={0} className="lg:hidden absolute z-50" theme="light"  >
                        <Menu mode="inline" className={clsx(store.isDark ? 'bg-gray-900 text-gray-100' : 'bg-white text-black')}>
                            <SubMenu key="sub1" icon={<ArticleIcon />} title="Article">
                                <Menu.Item key="11">Article</Menu.Item>
                                <Menu.Item key="12">Opinions</Menu.Item>
                                <Menu.Item key="13">Science And Technology</Menu.Item>
                                <Menu.Item key="14">Other</Menu.Item>
                            </SubMenu>

                            <Menu.Item key="scholarship" icon={<ScholarshipIcon />}>
                                Scholarship
                            </Menu.Item>
                            <SubMenu key="sub3" icon={<LoksewaIcon />} title="Loksewa">
                                <Menu.Item key="31">MCQ</Menu.Item>
                                <Menu.Item key="32">Mock Test</Menu.Item>
                                <Menu.Item key="33">Notices and Reading Materials</Menu.Item>
                                <Menu.Item key="34">Syllabus and Other</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub4" icon={<InformationIcon />} title="Information">
                                <Menu.Item key="41">Special Info</Menu.Item>
                                <Menu.Item key="42">Exams and Standarized Test</Menu.Item>
                                <Menu.Item key="43">How to ?</Menu.Item>
                                <Menu.Item key="44">Federal Nepal</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Content className={clsx(store.isDark ? 'bg-black  text-gray-100' : 'bg-white text-black', 'container flex flex-co mt-4 mx-auto  min-h-screen')}>
                        {children}
                    </Content>

                </Content>


            </Layout >
            <Footer style={{ textAlign: 'center' }} className="bg-gray-600 text-white mx-0 ">
                <div className="flex flex-row flex-wrap">
                    <div className="flex-1 min-w-max my-4 mx-4">
                        <div><Link href="/post/create">Send Articles</Link></div>
                        <div>Donate</div>
                        <div>Advertise With Us</div>
                        <div>Write For Us</div>
                        <div>Suggestions and Complaint</div>
                        <div>Kaaphal Events</div>

                    </div>
                    <div className="flex-1 min-w-max  my-4 mx-4">
                        <div>Articles</div>
                        <div>Scholarships</div>
                        <div>Loksewa Materials and MCQ</div>
                        <div>Mock Test</div>
                        <div>Notices</div>
                    </div>

                    <div className="flex-1 min-w-max  my-4 mx-4">
                        <div><Link href="/privacy-policy">Privacy Policy</Link></div>
                        <div><Link href="/terms-and-conditions">Terms and Conditions</Link></div>
                        <div><Link href="/about-us">About Us</Link></div>
                        <div>CSR</div>
                        <div>Job Vacancy</div>
                    </div>
                </div>
                <Divider className="bg-gray-400" />
                <div>
                    <span className="font-bold">Kaaphal</span> is a trademark owned by <Link href="https://kaaphal.com">Kaaphal Inc.</Link>
                </div>
                <div>
                    Copyright ©2020 by <Link href="https://kaaphal.com">Kaaphal.</Link> All Rights  Reserved.
                    </div>
            </Footer>
            <BackTop />
        </Layout >)
}
export default DefaultLayout;

const ObservableDefaultLayout = observer(DefaultLayout);

export const defualtLayout = (page: JSX.Element): React.ReactNode => <ObservableDefaultLayout>{page}</ObservableDefaultLayout>