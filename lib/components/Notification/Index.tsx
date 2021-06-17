import { Badge, Menu, notification, Spin, Tooltip } from 'antd';
import clsx from 'clsx';
import { observer } from 'mobx-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { useGetMeNotificationQuery, useUpdateMeNotificationMutation } from '../../../gql';
import useStore from '../../../store/storeProvider';
import { defaultPollingInterval } from '../../../utils/GlobalConstants';
import { skipper } from '../../accessToken';
import { NotificationIcon } from '../Icons/Index';
function Notification(props: any): JSX.Element {
    const store = useStore();
    const { data, loading, previousData } = useGetMeNotificationQuery({ pollInterval: defaultPollingInterval, ssr: false, skip: skipper() })
    const [updateNotification] = useUpdateMeNotificationMutation();
    useEffect(() => {
        if (data && previousData && (!previousData.getMeNotification[0] || previousData.getMeNotification[0].id !== data.getMeNotification[0].id)) {
            notification.destroy();
            notification.open({
                message: 'Notification',
                description:
                    data.getMeNotification[0].body,
            })
        }
    }, [data, previousData])
    return <Menu.SubMenu
        icon={<Badge count={data ? data.getMeNotification.reduce((total, notification) => total += !notification.read ? 1 : 0, 0) : 0} overflowCount={9} className={clsx(store.isDark ? 'text-white' : 'text-black', 'z-50')}>
            <NotificationIcon ></NotificationIcon>
        </ Badge>} style={{ marginLeft: 2, marginRight: 4 }}  {...props}>
        {
            data ? data.getMeNotification.map(notification => <Menu.Item key={notification.id} className="max-w-sm" onClick={() => updateNotification({ variables: { notificationId: notification.id } })}><Tooltip title={notification.body}><Link href={notification.url}>{notification.body}</Link></Tooltip></Menu.Item>)
                :
                <Menu.Item className="text-center" ><Spin /> </Menu.Item>
        }
        {data && !data.getMeNotification.length && <Menu.Item className="max-w-xs">You dont have any notifications yet</Menu.Item>}
    </Menu.SubMenu  >
}

export default Notification