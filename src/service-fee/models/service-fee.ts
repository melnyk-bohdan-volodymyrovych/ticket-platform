import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ServiceFee {
  @Field(() => Float, { nullable: true })
  percentage: number;

  @Field(() => Float, { nullable: true })
  minimal: number;
}
