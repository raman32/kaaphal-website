import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AdminController {

    @Get('admin*')
    @Render('admin')
    async admin() { }

}