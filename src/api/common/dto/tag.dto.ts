import { Tag } from '.prisma/client';

export interface TagDto extends Tag {
    id: string;
    name: string;
}
