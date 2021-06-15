import { Result, Button } from 'antd';
import { defualtLayout } from './layouts/default';
import Link from 'next/link';
const PageNotFound = (): JSX.Element => {
    return <Result
        status="500"
        title="500"
        subTitle="Some Internal Error Occured we are sorry for the inconvinience"
        className="w-full text-center"
        extra={<Link href="/"><Button type="primary">Back Home</Button></ Link>}
    />

}
PageNotFound.getLayout = defualtLayout
export default PageNotFound;