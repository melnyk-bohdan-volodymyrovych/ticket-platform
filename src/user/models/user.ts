import { User as UserDb } from '@prisma/client';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: UserDb['id'];

  @Field(() => String)
  email: UserDb['email'];

  @Field(() => String)
  name: UserDb['name'];
}
