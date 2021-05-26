import { NextPage } from 'next';

const PageNotFound: NextPage<Record<string, never>> = () => {
    return (<div>404 Not found! Please Check your Adress Redirect to home </div>)
}
export default PageNotFound;