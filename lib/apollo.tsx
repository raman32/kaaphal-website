import {
    getAccessToken,
    getRefreshToken,
    isExpired,
    setAccessToken,
    setExpiry,
    setRefreshToken,
} from './accessToken';
import {
    graphQLEndpoint,
    host,
    refresh,
    refreshUrl,
} from '../utils/GlobalConstants';
import Router from 'next/router';
import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
    NormalizedCacheObject,
} from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';

export const restrictedPath = ['/user/profile', '/user/account'];

export const isServer = (): boolean => typeof window === 'undefined';

export function withApollo(PageComponent) {
    const WithApollo = ({
        apolloClient,
        apolloState,
        authToken,
        ...pageprops
    }: any) => {
        // if (!isServer() && !getAccessToken()) {
        //     const token = sessionStorage.getItem(refresh);
        //     if (token) {
        //         setRefreshToken(token);
        //     } else {
        //         if (restrictedPath.indexOf(Router.pathname) !== -1) {
        //             Router.push('/login');
        //         }
        //     }
        // }
        const client = new ApolloClient({ uri: "http://localhost:3000/graphql", cache: new InMemoryCache() });
        //const client = apolloClient || initApolloClient(apolloState);
        return <PageComponent {...pageprops} apolloClient={client} />;
    };
    if (process.env.NODE_ENV !== 'production') {
        const displayName =
            PageComponent.displayName || PageComponent.name || 'Component';
        if (displayName === 'App') {
            console.log('withApollo only works with Pages');
        }
        WithApollo.displayName = `withApollo(${displayName})`;
    }
    return WithApollo;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function initApolloClient(initalState: any, accessToken?: string) {
    if (!apolloClient) {
        apolloClient = createApolloClient(initalState);
    }
    return apolloClient;
}

function createApolloClient(initialState = {}, accessToken?: string) {
    const httpLink = new createUploadLink({ uri: graphQLEndpoint, fetch });
    const refreshLink = new TokenRefreshLink<any>({
        accessTokenField: 'tokens',
        isTokenValidOrUndefined: () => {
            return isExpired();
        },
        fetchAccessToken: () => {
            return fetch(refreshUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Access-Control-Allow-Origin': host,
                    'Access-Control-Allow-Credentials': 'true',
                    refresh_token: getRefreshToken(),
                },
            });
        },
        handleFetch: (response) => {
            setAccessToken(response.jwt_token);
            setRefreshToken(response.refresh_token);
            setExpiry();
        },
        handleError: (err) => {
            setAccessToken(null);
            setRefreshToken(null);
        },
    });

    const authLink = setContext((_request, { headers }) => {
        const token = isServer() ? null : getAccessToken();
        return {
            headers: {
                ...headers,
                authorization: token ? `bearer ${token}` : '',
            },
        };
    });

    // TODO sentry implementation
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        console.log(graphQLErrors);
        console.log(networkError);
    });

    return new ApolloClient({
        ssrMode: false,
        link: ApolloLink.from([refreshLink, authLink, errorLink, httpLink]),
        cache: new InMemoryCache().restore(initialState),
    });
}
