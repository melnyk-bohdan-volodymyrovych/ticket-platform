import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Ticket } from './models/ticket';
import { GetTicketArgs } from './dto/args/get-ticket.args';
import { TicketService } from './ticket.service';
import { CreateTicketDataInput } from './dto/input/create-ticket-data.input';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private readonly service: TicketService) {}
  @Query(() => Ticket, { name: 'ticket', nullable: false })
  async getTicket(@Args() args: GetTicketArgs) {
    return this.service.getTicket(args);
  }

  @Mutation(() => Ticket)
  async createTicket(@Args('createTicket') ticketData: CreateTicketDataInput) {
    return this.service.createTicket(ticketData);
  }
}
