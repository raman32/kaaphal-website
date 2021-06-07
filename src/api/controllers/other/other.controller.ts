import { Controller, Get, Render } from '@nestjs/common';

@Controller('privacy-policy')
export class PrivacyPolicyController {
    constructor() { }
    @Get()
    @Render('PrivacyPolicy')
    async privacyPolicy() { }
}


@Controller('terms-and-conditions')
export class TermsAndConditionsController {
    constructor() { }
    @Get()
    @Render('TermsAndConditions')
    async termsAndConditions() { }
}


@Controller('about-us')
export class AboutUsController {
    constructor() { }
    @Get()
    @Render('AboutUs')
    async termsAndConditions() { }
}
