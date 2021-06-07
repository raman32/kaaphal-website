import { Controller, Get, Render } from '@nestjs/common';

@Controller('loksewa')
export class LoksewaContorller {
    @Get()
    @Render('Loksewa')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async loksewaLanding() { }

    @Get('mcq')
    @Render('LoksewaMCQ')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async loksewaMCQ() { }

}
