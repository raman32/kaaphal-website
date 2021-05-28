import { Controller, Get, Post, Header, Render, Headers, Param, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../../../services/auth.service';
import { SessionService } from '../../../services/session.service';
import { GoogleAuthGuard } from '../../resolvers/auth/guards/google-auth.guard'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly sessionService: SessionService) { }




    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth(@Req() req) { }

    @Get('/google/redirect')
    @Render('MagicLinkValidating')
    @UseGuards(GoogleAuthGuard)
    async googleAuthRedirect(@Req() req) {
        const validate = await this.authService.validateGoogleLogin(req.user)
        if (!validate.invalid) {
            return {
                invalid: false,
                auth: {
                    accessToken: validate.auth.refreshToken,
                    refreshToken: validate.auth.refreshToken,
                },
            };
        }
        return {
            invalid: true,
        };
    }


    @Get('validationError')
    @Render('MagicLinkError')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async magicLinkError() { }


    @Get(':token')
    @Render('MagicLinkValidating')
    async getMagicLinkUser(@Param('token') token: string): Promise<{ invalid: boolean, auth?: { accessToken: string, refreshToken: string } }> {
        const validate = await this.authService.validateMagicLink({ token });
        if (!validate.invalid) {
            return {
                invalid: false,
                auth: {
                    accessToken: validate.auth.refreshToken,
                    refreshToken: validate.auth.refreshToken,
                },
            };
        }
        return {
            invalid: true,
        };
    }
    @Post('/refresh-token')
    @Header('Cache-Control', 'no-cache')
    async refreshToken(@Headers('refresh_token') reftoken: string | undefined | null): Promise<{
        tokens: {
            jwt_token: string
            refresh_token: string
            invalid: boolean
        }
    }> {
        if (reftoken === undefined || reftoken === 'undefined' || reftoken === null || reftoken === 'null') {
            return {
                tokens: {
                    jwt_token: undefined,
                    refresh_token: undefined,
                    invalid: true,
                },
            };
        } else {
            const sessioninfo = await this.sessionService.revalidateSession(reftoken);
            if (sessioninfo) {
                return {
                    tokens: {
                        jwt_token: sessioninfo?.authToken,
                        refresh_token: sessioninfo?.refreshToken,
                        invalid: false,
                    },
                };
            } else {
                return {
                    tokens: {
                        jwt_token: undefined,
                        refresh_token: undefined,
                        invalid: true,
                    },
                };
            }
        }
    }

}