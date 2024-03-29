import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { LoksewaMockSet } from '../loksewaMockSet.model';

@ObjectType()
export class LoksewaSetConnection extends PaginatedResponse(LoksewaMockSet) { }
