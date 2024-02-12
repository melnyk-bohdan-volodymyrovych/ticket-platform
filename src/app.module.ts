import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './db/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { ServiceFeeModule } from './service-fee/service-fee.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      useGlobalPrefix: true,
    }),
    ConfigModule.forRoot(),
    PrismaModule,
    TicketModule,
    UserModule,
    ServiceFeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
