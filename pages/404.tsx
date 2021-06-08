import { Result, Button } from 'antd';
import { defualtLayout } from './layouts/default';
import Link from 'next/link';
const PageNotFound = (): JSX.Element => {
    return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link href="/"><Button type="primary">Back Home</Button></ Link>}
    />

}
PageNotFound.getLayout = defualtLayout
export default PageNotFound;