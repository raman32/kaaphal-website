import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { RenderModule } from 'nest-next'
import Next from 'next'
import { join } from 'path/posix'
import { ApiModule } from './api/api.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== 'production' })),
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true
      },
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      uploads: {
        maxFileSize: 20971520,
      },
      context: ({ req }) => ({ req }),
    }),
    ApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
