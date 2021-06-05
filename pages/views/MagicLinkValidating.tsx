import React, { useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import {
    setAccessToken,
    setCustomExpiry,
    setRefreshToken,
} from '../../lib/accessToken';
import moment from 'moment';
import Router from 'next/router';
import { Auth } from '../../src/api/common/dto/auth.dto';
import { Spin, Typography } from 'antd';

interface Props {
    data: {
        auth: Auth;
    };
}

const MagicLinkValidating: NextPage<Props> = ({ data }) => {
    useEffect(() => {
        if (data) {
            setAccessToken(data.auth.accessToken);
            setRefreshToken(data.auth.refreshToken);
            setCustomExpiry(moment().add(30, 'minutes').toDate());
            setTimeout(() => {
                Router.push('/');
            }, 3000);
        }
    }, []);

    return (
        <div className="m-auto" >
            <Spin size="large"><Typography>Validating!! We will redirect you shortly</Typography></Spin>
        </div>

    );
}

export async function getServerSideProps(context: NextPageContext): Promise<any> {
    const { invalid, ...rest } = context.query;
    if (invalid) {
        return {
            redirect: {
                destination: '/auth/validationError',
                permanent: false,
            },
        };
    }
    return {
        props: {
            data: rest,
        },
    };
}

export default MagicLinkValidating;
