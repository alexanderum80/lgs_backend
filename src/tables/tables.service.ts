import { PaymentsEntity } from './../payments/payments.entity';
import { TablesGameEntity } from './../tables-game/tables-game.entity';
import { UsersEntity } from './../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TablesEntity, TablesInitValuesEntity } from './tables.entity';
import { TableInput } from './tables.models';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(TablesEntity) private readonly tablesRepository: Repository<TablesEntity>,
    @InjectRepository(TablesInitValuesEntity) private readonly initValuesRepository: Repository<TablesInitValuesEntity>
  ) {}

  async findAll(): Promise<TablesEntity[]> {
    try {
      return new Promise<TablesEntity[]>((resolve, reject) => {
         this.tablesRepository.find({ relations: ['TableGame', 'InitValues', 'InitValues.Payment', 'InitValues.Payment.Coin'] }).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }
  
  async findAllWithInitValues(): Promise<TablesEntity[]> {
    try {
      return new Promise<TablesEntity[]>((resolve, reject) => {
        this.tablesRepository.createQueryBuilder('t')
          .select('t.IdTable', 'IdTable')
          .addSelect('t.Description', 'Description')
          .addSelect('t.IdGame', 'IdGame')
          .addSelect('t.Enabled', 'Enabled')
          .addSelect('g.Name', 'Game')
          .addSelect('SUM(COALESCE(p.Denomination, 0) * COALESCE(i.Qty, 0))', 'TotalInitValues')
          .innerJoin(TablesGameEntity, 'g', 'g.IdGame = t.IdGame')
          .leftJoin(TablesInitValuesEntity, 'i', 'i.IdTable = t.IdTable')
          .leftJoin(PaymentsEntity, 'p', 'p.IdPayment = i.IdPayment')
          .groupBy('t.IdTable')
          .addGroupBy('t.Description')
          .addGroupBy('t.IdGame')
          .addGroupBy('t.Enabled')
          .addGroupBy('g.Name')          
        .execute().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findInitialValues(idTable: number): Promise<TablesInitValuesEntity[]> {
    try {
      return new Promise<TablesInitValuesEntity[]>((resolve, reject) => {
         this.initValuesRepository.find({ IdTable: idTable }).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<TablesEntity> {
    try {
      return new Promise<TablesEntity>((resolve, reject) => {
         this.tablesRepository.findOne(id, { relations: ['InitValues']}).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  async create(user: UsersEntity, tableInput: TableInput): Promise<TablesEntity> {
    try {
      delete tableInput.Table.IdTable;

      return new Promise<TablesEntity>((resolve, reject) => {
        this.tablesRepository.save(tableInput.Table).then(result => {
          tableInput.InitValues.map(i => {
            delete i.IdInitValue;
            i.IdTable = result.IdTable;
            i['IdUser'] = user.Id;
            i['Date'] = new Date();
          });

          this.initValuesRepository.save(tableInput.InitValues).then(() => {
            resolve(result);
          }).catch(err => {
            reject(err.message || err);
          });
        }).catch(err => {
          reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  update(user: UsersEntity, tableInput: TableInput) {
    try {
      return new Promise<TablesEntity>((resolve, reject) => {
        this.tablesRepository.save(tableInput.Table).then(result => {
          this.initValuesRepository.delete({ IdTable: result.IdTable }).then(() => {
            tableInput.InitValues.map(i => {
              i['IdUser'] = user.Id;
              i['Date'] = new Date();
            });
            
            this.initValuesRepository.save(tableInput.InitValues).then(() => {
              resolve(result);
            }).catch(err => {
              reject(err.message || err);
            });
          }).catch(err => {
              reject(err.message || err);
          });
        }).catch(err => {
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
         this.tablesRepository.delete(IDs).then(result => {
             resolve(result.affected);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }
}
