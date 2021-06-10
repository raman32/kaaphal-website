import { Controller, Get, Param, Render } from '@nestjs/common';
import { PrismaService } from '../../../services/prisma.service';

@Controller('loksewa')
export class LoksewaContorller {
    constructor(private readonly prisma: PrismaService) { }
    @Get()
    @Render('loksewa/Loksewa')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async loksewaLanding() { }

    @Get('mcq*')
    @Render('loksewa/mcq')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async loksewaMCQ() { }

    @Get('mock*')
    @Render('loksewa/mock')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async loksewaMock() { }



}
