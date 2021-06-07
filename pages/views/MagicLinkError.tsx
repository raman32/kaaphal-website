import { Button, Result } from 'antd';
import { NextPage } from 'next';
import Router from 'next/router';

const MagicLinkError: NextPage<Record<string, never>> = () => {
    return <div className="h-screen flex flex-col justify-center">
        <Result
            status="warning"
            title="There are some problems with your operation."
            extra={
                <Button type="primary" key="console" onClick={() => { Router.push('/') }}>
                    Go Home
          </Button>
            }
        />
    </div>
}
export default MagicLinkError;