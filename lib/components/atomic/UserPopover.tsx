import { Divider, Popover, Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { User } from '../../../gql';
import { parseFullName } from '../../common/helpers/parse';
import UserAvatar from './UserAvatar';

export function UserPopover(props: React.ComponentProps<typeof Popover> & { user: User }): JSX.Element {
    const content = <Space size="small" align="center" className="flex flex-row " split={<Divider type="vertical" />}>
        <UserAvatar user={props.user} />
        <div className="flex flex-col justify-center">
            <Text >{parseFullName(props.user.firstName, props.user.middleName, props.user.lastName)}</Text>
            <Text>{props.user.email}</Text>
            <Text>{props.user.displayName}</Text>
        </div>
    </Space>
    return <Popover {...props} destroyTooltipOnHide placement="topLeft" zIndex={2000}
        content={content}
    >
    </Popover>
}