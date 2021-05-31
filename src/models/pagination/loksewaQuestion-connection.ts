import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { LoksewaQuestion } from '../loksewaQuestion.model';

@ObjectType()
export class LoksewaQuestionConnection extends PaginatedResponse(LoksewaQuestion) { }
