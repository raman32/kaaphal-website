import { User, Language, PostStatus } from '.prisma/client';
import { CommentDto } from './comment.dto';
import { ReactionDto } from './reaction.dto';
import { TagDto } from './tag.dto';

export interface PostDto {
    id: string;
    publishedAt: Date | null;
    body: string | null;
    title: string;
    language: Language;
    userId: string | null;
    deleted: boolean;
    status: PostStatus;
    comments: CommentDto[];
    reactions: ReactionDto[];
    tags: TagDto[];
    user: User & { image: { source: string, preview: string } }
}
