import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { File } from '../file.model';

@ObjectType()
export class FileConnection extends PaginatedResponse(File) { }
