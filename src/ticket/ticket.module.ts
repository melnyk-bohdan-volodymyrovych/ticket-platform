import { Module } from '@nestjs/common';
import { TicketResolver } from './ticket.resolver';
import { TicketService } from './ticket.service';
import { TicketRepository } from './ticket.repository';

@Module({
  providers: [TicketResolver, TicketService, TicketRepository],
})
export class TicketModule {}
