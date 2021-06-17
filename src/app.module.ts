import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { RenderModule } from 'nest-next'
import Next from 'next'
import { join } from 'path/posix'
import { host } from '../utils/GlobalConstants'
import { ApiModule } from './api/api.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import config from './config/config'



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== 'production' }), { viewsDir: '' }),
    GraphQLModule.forRoot({
      debug: false,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        origin: host,
        credentials: true
      },
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      uploads: false,
      context: ({ req }) => ({ req }),

    }),
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
