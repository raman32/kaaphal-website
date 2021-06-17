import { observer } from 'mobx-react';
import { NextPageContext } from 'next'
import { defualtLayout } from '../layouts/default';
// The component's props type
type PageProps = {
    title: string
}

// extending the default next context type
type PageContext = NextPageContext & {
    query: PageProps
}

// react component
const Page = ({ title }: PageProps): JSX.Element => {

    return (
        <div className="w-full">
            <div className="my-10 ">
                <div className="mx-4 text-base my-2 flex flex-row ">
                    Loksewa Other
                </div>
            </div>
            <div className="my-10 max-w-4xl">
                <div id="post-scroll-area">

                </div>
            </div>
        </div >
    )
}

Page.getLayout = defualtLayout;

export default observer(Page)