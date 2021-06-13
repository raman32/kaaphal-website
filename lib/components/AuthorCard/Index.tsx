import { Card, Divider, Space } from 'antd';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import React from 'react';
import { User } from '../../../gql';
import useStore from '../../../store/storeProvider';
import UserAvatar from '../atomic/UserAvatar';

function AuthorCard(props: React.ComponentProps<typeof Card> & { user: User }): JSX.Element {
    const store = useStore();
    return <Card {...props} hoverable className={clsx(store.isDark ? 'bg-black text-white border-gray-700 hover:border-gray-500' : '', props.className)}>
        <Space size="small" align="center" className="flex flex-row " split={<Divider type="vertical" />}>
            <UserAvatar user={props.user} />
            <div className="flex flex-col justify-center">
                <h5>{props.user.displayName}</h5>
                <h5>{props.user.bio}</h5>
            </div>
        </Space>
    </Card>
}

export default observer(AuthorCard)