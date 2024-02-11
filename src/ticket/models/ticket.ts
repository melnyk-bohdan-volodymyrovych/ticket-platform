import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Ticket as TicketDB } from '@prisma/client';

@ObjectType()
export class Ticket {
  @Field(() => Int)
  id: TicketDB['id'];

  @Field(() => String)
  barcode: TicketDB['barcode'];

  @Field(() => Float)
  serviceFee: TicketDB['serviceFee'];

  @Field(() => Float)
  buyerPrice: TicketDB['buyerPrice'];

  @Field(() => Float)
  promoterReceivesPrice: TicketDB['promoterReceivesPrice'];
}
