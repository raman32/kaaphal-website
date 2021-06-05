import { NextPage } from 'next';
import { Result, Button } from 'antd';
const PageNotFound: NextPage<Record<string, never>> = () => {
    return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
    />

}
export default PageNotFound;