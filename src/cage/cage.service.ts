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

  async getMoneyBreakdown(amount: number): Promise<MoneyBreakdown[]> {
    try {
      const _moneyBreakdown: MoneyBreakdown[] = [];
      return new Promise<MoneyBreakdown[]>((resolve, reject) => {
        if (amount > 0) {
          getManager()
            .find(CurrencyNowView, {
              where: { currencynow: MoreThan(0) },
              order: { Denomination: 'DESC' },
            })
            .then((res) => {
              let breakdown = 0;

              for (let i = 0; i < res.length; i++) {
                const element = res[i];

                if (element.Denomination <= amount) {
                  breakdown = Math.floor(amount / element.Denomination);
                  if (breakdown > element.currencynow) {
                    breakdown = element.currencynow;
                  }

                  amount = amount % element.Denomination;

                  _moneyBreakdown.push({
                    IdPayInstr: element.IdPayInstr,
                    IdPayment: element.IdPayment,
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
