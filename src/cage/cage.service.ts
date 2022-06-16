import {
  EOperations,
  EPaymentInstrument,
} from './../operations/operations.model';
import { CageEntity, CurrencyNowView } from './cage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CageInput, MoneyBreakdown } from './cage.model';
import { Repository, getManager, MoreThan } from 'typeorm';

@Injectable()
export class CageService {
  constructor(
    @InjectRepository(CageEntity)
    private readonly cageRepository: Repository<CageEntity>,
  ) {}

  async findAll(): Promise<CageEntity[]> {
    try {
      return new Promise<CageEntity[]>((resolve, reject) => {
        this.cageRepository
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

  async findOne(id: number): Promise<CageEntity> {
    try {
      return new Promise<CageEntity>((resolve, reject) => {
        this.cageRepository
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

  async create(cageInput: CageInput): Promise<CageEntity> {
    try {
      return new Promise<CageEntity>((resolve, reject) => {
        this.cageRepository
          .save(cageInput)
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

  async remove(idOperation: number): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        this.cageRepository
          .delete({ IdOperation: idOperation })
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

  async getMoneyBreakdown(
    amount: number,
    idOperation: EOperations,
  ): Promise<MoneyBreakdown[]> {
    try {
      const _moneyBreakdown: MoneyBreakdown[] = [];
      return new Promise<MoneyBreakdown[]>((resolve, reject) => {
        if (amount > 0) {
          const _conditions = { currencynow: MoreThan(0) };
          switch (idOperation) {
            case EOperations.DEPOSIT:
              Object.assign(_conditions, {
                IdPayInstr: EPaymentInstrument.PLATES,
              });
              break;
            default:
              Object.assign(_conditions, {
                IdPayInstr: EPaymentInstrument.CASH,
              });
              break;
          }
          getManager()
            .find(CurrencyNowView, {
              where: _conditions,
              order: { IdCurrency: 'ASC', Denomination: 'DESC' },
            })
            .then((res) => {
              let breakdown = 0;

              for (let i = 0; i < res.length; i++) {
                const element = res[i];

                if (element.Denomination <= amount) {
                  breakdown = Math.floor(
                    amount / (element.Denomination * element.Rate),
                  );
                  if (breakdown > element.currencynow) {
                    breakdown = element.currencynow;
                  }

                  amount = amount % (element.Denomination * element.Rate);

                  _moneyBreakdown.push({
                    IdPayInstr: element.IdPayInstr,
                    IdPayment: element.IdPayment,
                    Denomination: element.Denomination,
                    Rate: element.Rate,
                    Quantity: breakdown,
                  });
                }
              }

              resolve(_moneyBreakdown);
            })
            .catch((err) => {
              reject(err.message || err);
            });
        }
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }
}
