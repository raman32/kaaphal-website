import { Module } from '@nestjs/common'
import { RenderModule } from 'nest-next'
import Next from 'next'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    RenderModule.forRootAsync(Next({ dev: process.env.NODE_ENV !== 'production' })),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
