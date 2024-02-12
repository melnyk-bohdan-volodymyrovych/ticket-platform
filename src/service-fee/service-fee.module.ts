import { Module } from '@nestjs/common';
import { ServiceFeeResolver } from './service-fee.resolver';
import { ServiceFeeService } from './service-fee.service';
import { ServiceFeeRepository } from './service-fee.repository';

@Module({
  providers: [ServiceFeeResolver, ServiceFeeService, ServiceFeeRepository],
})
export class ServiceFeeModule {}
