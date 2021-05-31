import { Controller, Get, Render } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('Index')
  getHello(): { title: string } {
    return {
      title: 'Kaaphal Website',
    }
  }

  @Get('/login')
  @Render('Login')
  async Login() {
    return {};
  }
}

