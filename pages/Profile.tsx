import { Spin, Typography } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { parseFullName } from '../lib/common/helpers/parse';
import UserAvatar from '../lib/components/atomic/UserAvatar';
import useStore from '../store/storeProvider';
import { defualtLayout } from './layouts/default';

const Profile = () => {
    const store = useStore();
    if (!store.user) return <div className="flex flex-col h-full justify-center items-center"> <Spin /> Loading </div>
    return (
        <div className="w-full">
            <div className="text-center" >
                <UserAvatar user={store.user} size={100} className="my-4" alt="user Avatar" />
                <Typography className="text-lg">{parseFullName(store.user.firstName, store.user.middleName, store.user.lastName)}</Typography>
            </div>
            <div>
                Posts: {store.user._count}
            </div>
        </div>)
}

// eslint-disable-next-line react/display-name
Profile.getLayout = defualtLayout;
export default observer(Profile);