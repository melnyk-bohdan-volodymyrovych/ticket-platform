import { Field, Float, InputType } from '@nestjs/graphql';
import { IsOptional, Max, Min } from 'class-validator';

@InputType()
export class SetServiceFeeInput {
  @Max(0.999)
  @Min(0.001)
  @IsOptional()
  @Field(() => Float, { nullable: true })
  percentage: number;

  @Min(0.01)
  @IsOptional()
  @Field(() => Float, { nullable: true })
  minimal: number;
}
