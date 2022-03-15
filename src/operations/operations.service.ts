import { PlatesEntity } from './../plates/plates.entity';
import { ChipsEntity } from './../chips/chips.entity';
import { TablesEntity } from './../tables/tables.entity';
import { OperationInput, EPaymentInstrument } from './operations.model';
import { Injectable } from '@nestjs/common';
import { OperationsREntity, OperationsDEntity } from './operations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(OperationsREntity) private readonly operationRRepository: Repository<OperationsREntity>,
    @InjectRepository(OperationsDEntity) private readonly operationDRepository: Repository<OperationsDEntity>
  ) {}

  async findAll(): Promise<OperationsREntity[]> {
    try {
      return new Promise<OperationsREntity[]>((resolve, reject) => {
        this.operationRRepository.find().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findAllLatest(idState): Promise<OperationsREntity[]> {
    try {
      const today = new Date(new Date(Date.now()).setHours(0, 0, 0, 0));

      return new Promise<OperationsREntity[]>((resolve, reject) => {
        this.operationRRepository.createQueryBuilder('r')
          .select('r.IdOperationKey', 'IdOperationKey')
          .addSelect('r.IdUser', 'IdUser')
          .addSelect('r.Date', 'Date')
          .addSelect('r.IdTable', 'IdTable')
          .addSelect('r.IdState', 'IdState')
          .addSelect(`COALESCE(t.Description, 'CAGE')`, 'Table')
          .addSelect(`SUM(CASE WHEN d.IdPayInstrument = ${ EPaymentInstrument.CHIPS } THEN d.Qty * c.Value WHEN d.IdPayInstrument = ${ EPaymentInstrument.PLATES } THEN d.Qty * p.Value ELSE d.Qty * d.IdDetail END)`, 'Amount')
          .innerJoin(OperationsDEntity, 'd', 'r.IdOperationKey = d.IdOperationKeyD')
          .leftJoin(TablesEntity, 't', 't.IdTable = r.IdTable')
          .leftJoin(ChipsEntity, 'c', 'c.IdChip = d.IdDetail')
          .leftJoin(PlatesEntity, 'p', 'p.IdPlate = d.IdDetail')
          .groupBy('r.IdOperationKey')
          .addGroupBy('r.IdUser')
          .addGroupBy('r.Date')
          .addGroupBy('r.IdTable')
          .addGroupBy('r.IdState')
          .addGroupBy('t.Description')
          // .addGroupBy('d.IdPayInstrument')
          .where('r.Date >= :date', { date: today.toDateString() })
          .andWhere('r.IdState = :state', { state: idState })
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

  async findOne(id: number): Promise<OperationsREntity> {
    try {
      return new Promise<OperationsREntity>((resolve, reject) => {
        this.operationRRepository.findOne(id, { relations: ['OperationsD']}).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findDetails(id: number): Promise<OperationsDEntity[]> {
    try {
      return new Promise<OperationsDEntity[]>((resolve, reject) => {
        this.operationDRepository.find({ IdOperationKeyD: id }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async create(user: number, operationInput: OperationInput): Promise<OperationsREntity> {
    try {
      delete operationInput.OperationR.IdOperationKey;

      operationInput.OperationR['Date'] = new Date();
      operationInput.OperationR['IdUser'] = user;

      return new Promise<OperationsREntity>((resolve, reject) => {
        this.operationRRepository.save(operationInput.OperationR).then(result => {
          operationInput.OperationD.map(d => {
            d.IdOperationKeyD = result.IdOperationKey
          });
          this.operationDRepository.save(operationInput.OperationD).then(() => {
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

  async update(user: number, operationInput: OperationInput): Promise<OperationsREntity> {
    try {
      operationInput.OperationR['Date'] = new Date();
      operationInput.OperationR['IdUser'] = user;
      
      return new Promise<OperationsREntity>((resolve, reject) => {
        this.operationRRepository.save(operationInput.OperationR).then(result => {
          this.operationDRepository.delete({ IdOperationKeyD: operationInput.OperationR.IdOperationKey}).then(() => {
            this.operationDRepository.save(operationInput.OperationD).then(() => {
              resolve(result);
            }).catch(err => {
              reject(err.message || err);
            });
          }).catch(err => {
            reject(err.message || err);
          })
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
        this.operationRRepository.delete(IDs).then(result => {
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
