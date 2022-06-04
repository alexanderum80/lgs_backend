import { PaymentsEntity, PaymentsView } from './payments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { PaymentInput } from './payments.model';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentsEntity)
    private readonly paymentsRepository: Repository<PaymentsEntity>,
  ) {}

  async findAll(): Promise<PaymentsView[]> {
    try {
      return new Promise<PaymentsView[]>((resolve, reject) => {
        const manager = getManager();

        manager
          .find(PaymentsView)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err.message || err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async findOne(id: number): Promise<PaymentsEntity> {
    try {
      return new Promise<PaymentsEntity>((resolve, reject) => {
        this.paymentsRepository
          .findOne(id)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err.message || err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async create(paymentInput: PaymentInput): Promise<PaymentsEntity> {
    try {
      delete paymentInput.IdPayment;

      return new Promise<PaymentsEntity>((resolve, reject) => {
        this.paymentsRepository
          .save(paymentInput)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err.message || err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async update(PaymentInput: PaymentInput): Promise<PaymentsEntity> {
    try {
      return new Promise<PaymentsEntity>((resolve, reject) => {
        this.paymentsRepository
          .save(PaymentInput)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err.message || err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async remove(IDs: number[]): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        this.paymentsRepository
          .delete(IDs)
          .then((result) => {
            resolve(result.affected);
          })
          .catch((err) => {
            reject(err.message || err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }
}
