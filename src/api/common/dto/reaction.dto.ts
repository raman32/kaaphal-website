import { ReactionType } from '.prisma/client';

export interface ReactionDto {
    type: ReactionType;
    userId: string;
}
