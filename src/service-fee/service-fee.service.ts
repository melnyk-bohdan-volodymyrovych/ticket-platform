import { Injectable } from '@nestjs/common';
import { ServiceFeeRepository } from './service-fee.repository';
import { SetServiceFeeInput } from './dto/input/service-fee.input';

@Injectable()
export class ServiceFeeService {
  constructor(private readonly repository: ServiceFeeRepository) {}
  getServiceFee() {
    return this.repository.getServiceFee();
  }

  setServiceFee(feeData: SetServiceFeeInput) {
    return this.repository.setServiceFee(feeData);
  }
}
