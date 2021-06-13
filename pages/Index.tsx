import { Button, Card, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next'
import { useState } from 'react'
import { useGetPostQuery } from '../gql'
import UserAvatar from '../lib/components/atomic/UserAvatar';
import { CommentIcon, DislikeIcon, FeedIcon, FireIcon, FlagIcon, HappyIcon, HotShotIcon, LikeIcon, SadIcon } from '../lib/components/Icons/Index';
import PostCard from '../lib/components/PostCard/Index';
import useStore from '../store/storeProvider';
import DefaultLayout, { defualtLayout } from './layouts/default';
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
    const [id, setId] = useState('')
    const { data, loading, error } = useGetPostQuery({ variables: { id: id } })
    console.log(data, loading, error)
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
                <div className="">
                    <PostCard
                        title="This is a very long Title for a general post of this type"
                        author={store.user}
                        excerpt=" Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    felis in pharetra vehicula, lorem erat tincidunt arcu,
                    ac semper lorem nunc id ipsum. Nam eu pellentesque libero.
                    Etiam blandit porta mauris, vitae consectetur nibh.
                    Vestibulum porta convallis tortor, in tempus risus auctor non.
                    Donec nibh nunc, auctor semper lacinia sed, dignissim sed velit.
                    Phasellus posuere euismod lorem. Integer nulla magna, euismod sed blandit in,
                    dignissim eget leo. Mauris nec neque nisl. Praesent eget porttitor mauris.asdasssssssssssssss
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultricies, felis in pharetra vehicula,
                    lorem erat tincidunt arcu, ac semper lorem nunc id ipsum. Nam eu pellentesque libero. Etiam blandit porta mauris,
                    vitae consectetur nibh. Vestibulum porta convallis tortor, in tempus risus auctor non. Donec nibh nunc,
                    auctor semper lacinia sed, dignissim sed velit. Phasellus posuere euismod lorem. Integer nulla magna,
                    euismod sed blandit in, dignissim eget leo. Mauris nec neque nisl."
                        reactions={{ dislike: 10, fire: 12, happy: 10, like: 10, sad: 2 }}
                        comments={10}
                        flags={0}
                        image="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="w-full h-full object-cover"
                    />
                    <PostCard
                        title="This is a very long Title for a general post of this type"
                        author={store.user}
                        excerpt=" Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    felis in pharetra vehicula, lorem erat tincidunt arcu,
                    ac semper lorem nunc id ipsum. Nam eu pellentesque libero.
                    Etiam blandit porta mauris, vitae consectetur nibh.
                    Vestibulum porta convallis tortor, in tempus risus auctor non.
                    Donec nibh nunc, auctor semper lacinia sed, dignissim sed velit.
                    Phasellus posuere euismod lorem. Integer nulla magna, euismod sed blandit in,
                    dignissim eget leo. Mauris nec neque nisl. Praesent eget porttitor mauris.asdasssssssssssssss
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultricies, felis in pharetra vehicula,
                    lorem erat tincidunt arcu, ac semper lorem nunc id ipsum. Nam eu pellentesque libero. Etiam blandit porta mauris,
                    vitae consectetur nibh. Vestibulum porta convallis tortor, in tempus risus auctor non. Donec nibh nunc,
                    auctor semper lacinia sed, dignissim sed velit. Phasellus posuere euismod lorem. Integer nulla magna,
                    euismod sed blandit in, dignissim eget leo. Mauris nec neque nisl."
                        reactions={{ dislike: 10, fire: 12, happy: 10, like: 10, sad: 2 }}
                        comments={10}
                        flags={0}
                        image="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="w-full h-full object-cover"
                    />
                    <PostCard
                        title="This is a very long Title for a general post of this type"
                        author={store.user}
                        excerpt=" Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    felis in pharetra vehicula, lorem erat tincidunt arcu,
                    ac semper lorem nunc id ipsum. Nam eu pellentesque libero.
                    Etiam blandit porta mauris, vitae consectetur nibh.
                    Vestibulum porta convallis tortor, in tempus risus auctor non.
                    Donec nibh nunc, auctor semper lacinia sed, dignissim sed velit.
                    Phasellus posuere euismod lorem. Integer nulla magna, euismod sed blandit in,
                    dignissim eget leo. Mauris nec neque nisl. Praesent eget porttitor mauris.asdasssssssssssssss
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultricies, felis in pharetra vehicula,
                    lorem erat tincidunt arcu, ac semper lorem nunc id ipsum. Nam eu pellentesque libero. Etiam blandit porta mauris,
                    vitae consectetur nibh. Vestibulum porta convallis tortor, in tempus risus auctor non. Donec nibh nunc,
                    auctor semper lacinia sed, dignissim sed velit. Phasellus posuere euismod lorem. Integer nulla magna,
                    euismod sed blandit in, dignissim eget leo. Mauris nec neque nisl."
                        reactions={{ dislike: 10, fire: 12, happy: 10, like: 10, sad: 2 }}
                        comments={10}
                        flags={0}
                        image="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="w-full h-full object-cover"
                    />
                    <PostCard
                        title="This is a very long Title for a general post of this type"
                        author={store.user}
                        excerpt=" Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    felis in pharetra vehicula, lorem erat tincidunt arcu,
                    ac semper lorem nunc id ipsum. Nam eu pellentesque libero.
                    Etiam blandit porta mauris, vitae consectetur nibh.
                    Vestibulum porta convallis tortor, in tempus risus auctor non.
                    Donec nibh nunc, auctor semper lacinia sed, dignissim sed velit.
                    Phasellus posuere euismod lorem. Integer nulla magna, euismod sed blandit in,
                    dignissim eget leo. Mauris nec neque nisl. Praesent eget porttitor mauris.asdasssssssssssssss
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ultricies, felis in pharetra vehicula,
                    lorem erat tincidunt arcu, ac semper lorem nunc id ipsum. Nam eu pellentesque libero. Etiam blandit porta mauris,
                    vitae consectetur nibh. Vestibulum porta convallis tortor, in tempus risus auctor non. Donec nibh nunc,
                    auctor semper lacinia sed, dignissim sed velit. Phasellus posuere euismod lorem. Integer nulla magna,
                    euismod sed blandit in, dignissim eget leo. Mauris nec neque nisl."
                        reactions={{ dislike: 10, fire: 12, happy: 10, like: 10, sad: 2 }}
                        comments={10}
                        flags={0}
                        image="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" className="w-full h-full object-cover"
                    />

                </div>
            </div>
        </div >
    )
}

Page.getLayout = defualtLayout;
// assigning the initial props to the component's props
Page.getInitialProps = (ctx: PageContext) => {
    return {
        title: ctx.query.title,
    }
}

export default observer(Page)