
import { Avatar, Image } from 'antd';
import React from 'react';
import { User } from '../../../gql';
import { host } from '../../../utils/GlobalConstants'
export default function UserAvatar(props: React.ComponentProps<typeof Avatar> & { user: User }): JSX.Element {
    const image = props.user && props.user.image ?
        <Image
            src={host + '/assets/' + props.user.image.source}
            preview={{
                src: host + '/assets/' + props.user.image.preview,
            }}
        />
        : null
    return (<Avatar
        src={image}
        {...props}
    >
        {props.user && props.user.displayName ? props.user.displayName[0] : 'A'}
    </Avatar>
    )
}