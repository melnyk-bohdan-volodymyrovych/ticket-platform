import { Field, Float, InputType } from '@nestjs/graphql';
import { Min, ValidateIf } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

@InputType({})
export class CreateTicketDataInput {
  @Min(0.01)
  @ValidateIf(
    (object) => {
      // This was done just to keep all the validation in one place
      if (object.buyerPrice && object.promoterReceivesPrice)
        throw new BadRequestException({
          message: 'Cannot pass both buyerPrice or promoterReceivesPrice',
        });

      return !object.promoterReceivesPrice;
    },
    {
      message: 'Either buyerPrice or promoterReceivesPrice should be passed',
    },
  )
  @Field(() => Float, { nullable: true })
  buyerPrice?: number;

  @Min(0.01)
  @ValidateIf((object) => !object.buyerPrice, {
    message: 'Either buyerPrice or promoterReceivesPrice should be passed',
  })
  @Field(() => Float, { nullable: true })
  promoterReceivesPrice?: number;
}
