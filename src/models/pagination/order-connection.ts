import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from '../../common/pagination/pagination';
import { Order } from '../order.model';

@ObjectType()
export class OrderConnection extends PaginatedResponse(Order) { }
