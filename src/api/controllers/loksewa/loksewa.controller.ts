import { Controller, Get, Param, Render } from '@nestjs/common';

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

    @Get('mcq/:category')
    @Render('LoksewaMCQQuestions')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async loksewaMCQQuestions(@Param('category') categoryId: string) {
        return {
            categoryId
        }
    }


}
