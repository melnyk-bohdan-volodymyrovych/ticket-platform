import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ServiceFee } from './models/service-fee';
import { ServiceFeeService } from './service-fee.service';
import { SetServiceFeeInput } from './dto/input/service-fee.input';

@Resolver(() => ServiceFee)
export class ServiceFeeResolver {
  constructor(private readonly service: ServiceFeeService) {}
  @Query(() => ServiceFee, { name: 'ServiceFee', nullable: true })
  async getServiceFee() {
    return this.service.getServiceFee();
  }

  @Mutation(() => ServiceFee)
  setServiceFee(@Args('setServiceFee') feeData: SetServiceFeeInput) {
    return this.service.setServiceFee(feeData);
  }
}
