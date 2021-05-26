import './styles/app.css';
import '/node_modules/antd/dist/antd.css'
import 'tailwindcss/tailwind.css'
import { withApollo } from '../lib/apollo';
import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';

function MyApp({ Component, pageProps, apolloClient }) {
    return (
        <>
            <Head>
                <title>Kaaphal</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    key="viewport-meta"
                />
                <meta name="description" content="Kaaphal Website -  Articles, Informations, Scholarships and Loksewa" />
            </Head>
            <ApolloProvider client={apolloClient}>
                <Component {...pageProps} />
            </ApolloProvider>
        </>
    );
}

export default withApollo(MyApp);
