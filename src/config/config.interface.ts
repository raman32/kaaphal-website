export interface Config {
    nest: NestConfig;
    cors?: CorsConfig;
    graphql: GraphQLConfig;
    security: SecurityConfig;
}

export interface NestConfig {
    port: number;
}

export interface CorsConfig {
    enabled: boolean;
}

export interface GraphQLConfig {
    playground: boolean;
    debug: boolean;
    schema: string;
}

export interface SecurityConfig {
    expiresIn: string;
    salt: string | number;
}
