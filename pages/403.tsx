import { Result, Button } from 'antd';
import { defualtLayout } from './layouts/default';
import Link from 'next/link';
const UnAuthorized = (): JSX.Element => {
    return <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to view this page"
        className="w-full text-center"
        extra={<Link href="/"><Button type="primary">Back Home</Button></ Link>}
    />

}
UnAuthorized.getLayout = defualtLayout
export default UnAuthorized;