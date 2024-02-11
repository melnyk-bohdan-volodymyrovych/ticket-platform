import { Injectable } from '@nestjs/common';
import { GetTicketArgs } from './dto/args/get-ticket.args';
import { PrismaService } from '../db/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  async getTicketById(args: GetTicketArgs) {
    return this.prisma.ticket.findFirstOrThrow({ where: args });
  }

  async createTicket(args: { data: Partial<Prisma.TicketCreateInput> }) {
    const { data } = args;

    // needs transaction to check barcode uniqueness in future
    const newTicket = await this.prisma.$transaction(async (tx) => {
      // TODO make here unique barcode generation
      const barcode = 'aka_unique_barcode';

      const newTicket = await tx.ticket.create({
        ...args,
        data: { barcode, ...data },
      });

      return newTicket;
    });

    return newTicket;
  }
}
