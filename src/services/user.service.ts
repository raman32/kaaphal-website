import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '../models/inputs/createUser.input';
import { UpdateUserInput } from '../models/inputs/updateUser.input';
import { PrismaService } from './prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }
    async createUser(data: CreateUserInput): Promise<User> {
        return this.prisma.user.create({
            data: {
                ...data,
            },
        });
    }
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