import { Config } from './config.interface';

const config: Config = {
    nest: {
        port: 3000,
    },
    graphql: {
        playground: true,
        debug: true,
        schema: './src/schema.gql',
    },
    security: {
        expiresIn: '1d',
        salt: 10,
    },
};

export default (): Config => config;
