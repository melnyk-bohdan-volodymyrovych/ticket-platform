import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetTicketArgs {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
}
