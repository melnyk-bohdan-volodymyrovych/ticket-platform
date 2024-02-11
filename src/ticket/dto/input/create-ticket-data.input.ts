import { Field, Float, InputType } from '@nestjs/graphql';
import { Min, ValidateIf } from 'class-validator';
import { IsExclusivelyDefined } from '../../../common/decorators/class-validator/is-exclusive.decorator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@InputType({})
export class CreateTicketDataInput {
  @Expose()
  @Min(0.01)
  @IsExclusivelyDefined({
    message: 'Either buyerPrice or promoterReceivesPrice should be passed',
  })
  @ValidateIf((object) => !object.promoterReceivesPrice)
  @Field(() => Float, { nullable: true })
  buyerPrice?: number;

  @Expose()
  @Min(0.01)
  @IsExclusivelyDefined({
    message: 'Either buyerPrice or promoterReceivesPrice should be passed',
  })
  @ValidateIf((object) => !object.buyerPrice)
  @Field(() => Float, { nullable: true })
  promoterReceivesPrice?: number;
}
