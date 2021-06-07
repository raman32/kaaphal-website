import { Button, Card, Divider, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../layouts/default';
import Texty from 'rc-texty';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import UserAvatar from '../../lib/components/atomic/UserAvatar';
import { BlockQuote } from '../../lib/components/atomic/BlockQuote';
import { ProductCard } from '../../lib/components/atomic/ProductCard';
import Animate from 'rc-animate';
TweenOne.plugins.push(Children);
const Profile: NextPage<Record<string, never>> = () => {
    const [animation, setAnimation] = useState(null)
    const numberAnimatorRef = useRef(null);
    useEffect(() => {
        const options = {
            root: document,
            rootMargin: '0px',
            threshold: 1.0
        }
        const observer = new IntersectionObserver(() => setAnimation({
            Children: {
                value: 10000, floatLength: 0,
            },
            duration: 1000,
        }
        ), options);
        observer.observe(numberAnimatorRef.current)
    }, [])
    return (
        <div className="w-full ">
            <div className="flex flex-col justify-center text-center text-3xl font-bold text-white px-4 self-center w-full" style={{ height: '600px', background: 'linear-gradient(135deg, #ff3329 3%, #ff6c00 98%' }} >
                <Texty duration={2000}> LOKSEWA PREPARATION ON KAAPHAL</Texty>
                <div className="text-lg font-normal h-36 text-left mt-8 mx-4 self-center ">
                    <QueueAnim delay={3000} >
                        <li key="demo1">Multiple Choice Question</li>
                        <li key="demo2">Kaaphal Mock™ Test</li>
                        <li key="demo3">Weekly Preparation Material</li>
                        <li key="demo4">Syllabus and Latest Updates</li>
                    </QueueAnim>
                </div>
                <Animate
                    transitionName="fade"
                    transitionAppear
                >
                    <Button type="primary" size="large" className="shadow" >Get Started</Button>
                </Animate>
            </div>
            <div ref={numberAnimatorRef} className="flex flex-row flex-wrap justify-around bg-gray-200 px-4 py-4 ">
                <div className="mx-8 my-4">
                    <TweenOne
                        animation={animation}
                        style={{ fontSize: 56, marginBottom: 12 }}
                    >
                        0
                    </TweenOne>
                    MCQ Questions
                    </div>
                <div className="mx-8 my-4">
                    <TweenOne
                        animation={animation}
                        style={{ fontSize: 56, marginBottom: 12 }}
                    >
                        0
                    </TweenOne>
                    Mock Test
                    </div>
                <div className="mx-8 my-4">
                    <TweenOne
                        animation={animation}
                        style={{ fontSize: 56, marginBottom: 12 }}
                    >
                        0
                    </TweenOne>
                    Loksewa Users
                    </div>
            </div>
            <div className="py-4 px-4 sm:px-8">
                <div className="text-lg">What our user say about Loksewa Preparation through kaaphal?</div>
                <div className="flex flex-row flex-wrap justify-around ">

                    <div className="mx-4 my-4 shadow text-center pt-4 rounded-sm w-80">
                        <UserAvatar user={{ displayName: 'Raman' }} size={50} />
                        <div className="mb-4 text-lg">Raman</div>
                        <BlockQuote >"Awesome Interface I really liked the Mock test feature"</BlockQuote>
                    </div>
                    <div className="mx-4 my-4  shadow  text-center pt-4 rounded-sm w-80">
                        <UserAvatar user={{ displayName: 'Rajkumar' }} size={50} />
                        <div className="mb-4 text-lg">Rajkumar</div>
                        <BlockQuote>"Helped me a lot on preparing"</BlockQuote>
                    </div>
                    <div className="mx-4 my-4  shadow  text-center pt-4 rounded-sm  w-80">
                        <UserAvatar user={{ displayName: 'Suman' }} size={50} />
                        <div className="mb-4 text-lg">Suman</div>
                        <BlockQuote>"I have no words on how much this helped me"</BlockQuote>
                    </div>
                    <div className="mx-4 my-4  shadow  text-center pt-4 rounded-sm  w-80">
                        <UserAvatar user={{ displayName: 'Guzu' }} size={50} />
                        <div className="mb-4 text-lg">Guzu</div>
                        <BlockQuote>"Good work team"</BlockQuote>
                    </div >
                </div >
            </div >
            <div className="py-4 px-4 sm:px-8 bg-gray-200">
                <div className="text-lg">Features</div>
                <div className="flex flex-row justify-around flex-wrap">
                    <ProductCard className="w-60 my-4 mx-4" title="MCQ" buttonText="Get Started" onButtonClick={() => { }}>
                        <ul>
                            <li>10,000 Question</li>
                            <li>All categories </li>
                            <li>All new question collected from various sources </li>
                        </ul>
                    </ProductCard>
                    <ProductCard className="w-60 my-4 mx-4" title="Mock Test" buttonText="Get Started" onButtonClick={() => { }}>
                        <ul>
                            <li>100 Sets</li>
                            <li>All Government positions </li>
                            <li> Engineering and Technical Sector also Included </li>
                            <li> SOC exam also included </li>
                        </ul>
                    </ProductCard>
                    <ProductCard className="w-60 my-4 mx-4" title="Materials" buttonText="Get Started" onButtonClick={() => { }}>
                        <ul>
                            <li>Weekly new Material</li>
                            <li>All Syllabus</li>
                            <li>Latest Informations*</li>
                        </ul>
                    </ProductCard>
                </div>
            </div >

        </div >)
}

Profile.getLayout = (page: JSX.Element): React.ReactNode => <DefaultLayout>{page}</DefaultLayout>
export default Profile;