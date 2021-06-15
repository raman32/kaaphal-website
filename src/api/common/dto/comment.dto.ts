import { User } from '.prisma/client';

export interface CommentDto {
    id: string
    createdAt: Date
    body: string;
    children: CommentDto[]
    user: User & { image: { preview: string } }
}
