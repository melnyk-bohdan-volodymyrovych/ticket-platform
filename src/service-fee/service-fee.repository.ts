import { PrismaService } from '../db/prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SetServiceFeeInput } from './dto/input/service-fee.input';

@Injectable()
export class ServiceFeeRepository {
  constructor(private readonly prisma: PrismaService) {}
  async getServiceFee(tx: Partial<PrismaClient> = this.prisma) {
    const percentage = await tx.$queryRaw`SELECT "ServiceFeePercentage"();`
      .then((result) => result[0]['ServiceFeePercentage'])
      .catch((e) => null);

    const minimal = await tx.$queryRaw`SELECT "MinimalServiceFee"();`
      .then((result) => result[0]['MinimalServiceFee'])
      .catch((e) => null);

    return { percentage, minimal };
  }

  async setServiceFee({ percentage, minimal }: SetServiceFeeInput) {
    await this.prisma.$transaction(async (tx) => {
      percentage
        ? await tx.$executeRawUnsafe(`CREATE or Replace FUNCTION "ServiceFeePercentage"()
    RETURNS double precision
    LANGUAGE 'sql'
    IMMUTABLE 
AS 'SELECT ${percentage.toFixed(3)}';`)
        : Promise.resolve(null);
      minimal
        ? await tx.$executeRawUnsafe(`CREATE or Replace FUNCTION "MinimalServiceFee"()
    RETURNS double precision
    LANGUAGE 'sql'
    IMMUTABLE 
AS 'SELECT ${minimal.toFixed(3)}';`)
        : Promise.resolve(null);
    });

    return this.getServiceFee();
  }
}
