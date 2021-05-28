import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from '../../../models/auth.model';
import { MagicLink } from '../../../models/magicLink.model';
import { AuthService } from '../../../services/auth.service';
import { PrismaService } from '../../../services/prisma.service';
import { MagicLinkDto } from '../../common/dto/magicLink.dto';

@Resolver(of => Auth)
export class AuthResolver {
    constructor(private readonly prisma: PrismaService,
        private readonly authService: AuthService) { }

    @Mutation((returns) => MagicLink)
    async sendMagicLink(@Args('email') email: string): Promise<MagicLinkDto> {
        return this.authService.sendMagicLink({ email });
    }



}