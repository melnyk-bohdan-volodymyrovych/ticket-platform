import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Ticket } from './models/ticket';
import { GetTicketArgs } from './dto/args/get-ticket.args';
import { TicketService } from './ticket.service';
import { CreateTicketDataInput } from './dto/input/create-ticket-data.input';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from '../common/guards/admin.guard';

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private readonly service: TicketService) {}
  @Query(() => Ticket, { name: 'ticket', nullable: false })
  async getTicket(@Args() args: GetTicketArgs) {
    return this.service.getTicket(args);
  }

  @Mutation(() => Ticket)
  @UseGuards(AdminGuard)
  async createTicket(@Args('createTicket') ticketData: CreateTicketDataInput) {
    return this.service.createTicket(ticketData);
  }
}
