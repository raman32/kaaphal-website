export const refresh = 'refresh-token';
export const host = process.env.NEXT_PUBLIC_SERVER_PATH;
export const graphQLEndpoint = `${host ? host : 'https://kaaphal.com'
    }/graphql`;
export const refreshUrl = `${host ? host : 'https://kaaphal.com'
    }/auth/refresh-token`;
export const jwtConstans = {
    secret: process.env.JWT_SECRET
}
export const activePollingInterval = 1000;
export const defaultPollingInterval = 30000;
