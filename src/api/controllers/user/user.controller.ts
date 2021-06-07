import { Controller, Get, Render } from '@nestjs/common';


@Controller('user')
export class UserController {
    @Get('profile')
    @Render('Profile')
    async getProfile() {
    }
}
