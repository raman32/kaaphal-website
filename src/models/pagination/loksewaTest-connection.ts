import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { LoksewaTest } from '../loksewaTest.model';

@ObjectType()
export class LoksewaTestConnection extends PaginatedResponse(LoksewaTest) { }
