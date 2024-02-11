import { TicketResolver } from './ticket.resolver';
import { Test } from '@nestjs/testing';
import { TicketModule } from './ticket.module';
import { TicketRepository } from './ticket.repository';
import { PrismaModule } from '../db/prisma.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CreateTicketDataInput } from './dto/input/create-ticket-data.input';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

describe('Ticket Resolver', () => {
  let app: INestApplication;
  let resolver: TicketResolver;
  let repositoryCreateTicketSpy: jest.SpyInstance<any>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [TicketModule, PrismaModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    resolver = app.get<TicketResolver>(TicketResolver);
    await app.init();
    const repository = app.get(TicketRepository);

    repositoryCreateTicketSpy = jest.spyOn(repository, 'createTicket');
  });

  afterEach(() => {});

  it('should be success on sending buyerPrice only', async () => {
    repositoryCreateTicketSpy.mockImplementationOnce(async ({ data }) =>
      Promise.resolve({ ...data, barcode: 'barcode' }),
    );

    const result = await resolver.createTicket({ buyerPrice: 100 });
    expect(result).toMatchObject({
      barcode: 'barcode',
      buyerPrice: 100,
      promoterReceivesPrice: 75,
      serviceFee: 25,
    });
  });

  it('should be success on sending promoterReceivesPrice only', async () => {
    repositoryCreateTicketSpy.mockImplementationOnce(async ({ data }) =>
      Promise.resolve({ ...data, barcode: 'barcode' }),
    );

    const result = await resolver.createTicket({ promoterReceivesPrice: 75 });
    expect(result).toMatchObject({
      barcode: 'barcode',
      buyerPrice: 100,
      promoterReceivesPrice: 75,
      serviceFee: 25,
    });
  });

  it('should throw an error on sending both buyerPrice and promoterReceivesPrice', async () => {
    const input = plainToInstance(CreateTicketDataInput, {
      buyerPrice: 100,
      promoterReceivesPrice: 75,
    });

    const exceptions = await validate(input);

    expect(exceptions.length).toBeGreaterThan(0);
  });
});
