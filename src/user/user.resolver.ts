import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user';
import { GetUserArgs } from './models/dto/get-user.args';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { name: 'user', nullable: false })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUser(@Args() args: GetUserArgs) {
    // this is just a boilerplate. Add logic if needed
    return {};
  }
}
