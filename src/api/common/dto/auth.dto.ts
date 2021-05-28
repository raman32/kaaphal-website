import { User } from '.prisma/client';
import { Token } from './token.dto';

export interface Auth extends Token {
    user: User
}