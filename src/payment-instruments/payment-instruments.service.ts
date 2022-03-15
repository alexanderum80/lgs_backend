import { PaymentInstrumentsEntity } from './payment-instruments.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentInstrumentsService {
  constructor(
    @InjectRepository(PaymentInstrumentsEntity) private readonly instrumentsRepository: Repository<PaymentInstrumentsEntity>
  ) {}

  async findAll(): Promise<PaymentInstrumentsEntity[]> {
    try {
      return new Promise<PaymentInstrumentsEntity[]>((resolve, reject) => {
        this.instrumentsRepository.find().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<PaymentInstrumentsEntity> {
    try {
      return new Promise<PaymentInstrumentsEntity>((resolve, reject) => {
        this.instrumentsRepository.findOne(id).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  // create(createPaymentInstrumentInput: CreatePaymentInstrumentInput) {
  //   return 'This action adds a new paymentInstrument';
  // }

  // update(id: number, updatePaymentInstrumentInput: UpdatePaymentInstrumentInput) {
  //   return `This action updates a #${id} paymentInstrument`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} paymentInstrument`;
  // }
}
