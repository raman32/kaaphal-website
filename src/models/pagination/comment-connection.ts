import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Comment } from '../comment.model';

@ObjectType()
export class CommentConnection extends PaginatedResponse(Comment) { }
