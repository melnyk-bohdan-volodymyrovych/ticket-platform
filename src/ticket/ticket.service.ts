import { Injectable } from '@nestjs/common';
import { GetTicketArgs } from './dto/args/get-ticket.args';
import { TicketRepository } from './ticket.repository';
import { CreateTicketDataInput } from './dto/input/create-ticket-data.input';

@Injectable()
export class TicketService {
  constructor(private readonly repository: TicketRepository) {}
  getTicket(args: GetTicketArgs) {
    return this.repository.getTicketById(args);
  }

  createTicket(ticketData: CreateTicketDataInput) {
    const data = { ...ticketData };

    //TODO change hardcoded value when #2 is done
    const serviceFeeRate = 0.25;

    if (!data.buyerPrice)
      data.buyerPrice = data.promoterReceivesPrice / (1 - serviceFeeRate);

    if (!data.promoterReceivesPrice)
      data.promoterReceivesPrice = data.buyerPrice * (1 - serviceFeeRate);

    data['serviceFee'] = data.buyerPrice * serviceFeeRate;

    return this.repository.createTicket({ data: data });
  }
}
