import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor() {
        super({
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: process.env.FACEBOOK_REDIRECT_URL,
            scope: 'email',
            profileFields: ['emails', 'name', 'picture'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any,): Promise<Promise<{ email: string, firstName: string, lastName: string, image: string, accessToken: string }>> {
        if (!profile) {
            throw new UnauthorizedException();
        }
        const { name, emails, picture } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            image: picture,
            accessToken
        };
        return user
    }
}
