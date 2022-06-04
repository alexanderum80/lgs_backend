import { CurrencyEntity } from './currency.entity';
import { CurrencyInput } from './currency.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>,
  ) {}

  async findAll(): Promise<CurrencyEntity[]> {
    try {
      return new Promise<CurrencyEntity[]>((resolve, reject) => {
        this.currencyRepository
          .find()
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

  async findOne(id: number): Promise<CurrencyEntity> {
    try {
      return new Promise<CurrencyEntity>((resolve, reject) => {
        this.currencyRepository
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

  async create(currencyInput: CurrencyInput): Promise<CurrencyEntity> {
    try {
      delete currencyInput.IdCurrency;

      return new Promise<CurrencyEntity>((resolve, reject) => {
        this.currencyRepository
          .save(currencyInput)
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

  async update(currencyInput: CurrencyInput): Promise<CurrencyEntity> {
    try {
      return new Promise<CurrencyEntity>((resolve, reject) => {
        this.currencyRepository
          .save(currencyInput)
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

  async delete(IDs: number[]): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        this.currencyRepository
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
