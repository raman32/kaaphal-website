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
                <h5>{props.user && props.user.displayName ? props.user.displayName : 'Anonymous'}</h5>
                <h5>{props.user && props.user.displayName ? props.user.bio : 'Superhero wears a mask as he is a threat to oppression and dogma. And I say what must be conveyed. Join me! and you and I will be the same.'}</h5>
            </div>
        </Space>
    </Card>
}

export default observer(AuthorCard)