import '/node_modules/antd/dist/antd.css'
import 'tailwindcss/tailwind.css'
import './styles/app.css';
import { withApollo } from '../lib/apollo';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { StoreProvider } from '../store/storeProvider';

function MyApp({ Component, pageProps, apolloClient }) {
    const getLayout = Component.getLayout || ((page) => page);
    return (
        <>
            <Head>
                <title>Kaaphal</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    key="viewport-meta"
                />
                <meta key='description' name="description" content="Kaaphal Website -  Articles, Informations, Scholarships and Loksewa" />
            </Head>
            <StoreProvider {...pageProps}>
                <ApolloProvider client={apolloClient}>
                    {getLayout(<Component {...pageProps} />)}
                </ApolloProvider>
            </StoreProvider>
        </>
    );
}

export default withApollo(MyApp);
