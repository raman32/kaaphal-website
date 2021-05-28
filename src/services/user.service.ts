import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { UpdateUserInput } from '../models/inputs/updateUser.model';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async updateUser(data: UpdateUserInput, userId: string): Promise<User> {
        return this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                ...data,
            },
        });
    }
}