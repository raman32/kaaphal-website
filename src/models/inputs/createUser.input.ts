
import { Field, InputType } from '@nestjs/graphql';
import { UserRole, UserStatus } from '../user.model';

@InputType()
export class CreateUserInput {
    @Field({ nullable: true })
    firstName: string;
    @Field({ nullable: true })
    lastName: string;
    @Field()
    email: string;
    @Field({ nullable: true })
    image: string;
    @Field({ nullable: true })
    middleName: string;
    @Field({ nullable: true })
    displayName: string;
    @Field({ nullable: true, defaultValue: UserRole.user })
    role: UserRole
    @Field({ nullable: true, defaultValue: UserStatus.active })
    status: UserStatus


}
