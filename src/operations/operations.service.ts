import { CageService } from './../cage/cage.service';
import { CasinoInfoService } from './../casino-info/casino-info.service';
import { TablesService } from './../tables/tables.service';
import { OperationInput, EPaymentInstrument, EOperations, OperationDInput, OperationRInput } from './operations.model';
import { Injectable } from '@nestjs/common';
import { OperationsREntity, OperationsDEntity, OperationsRView } from './operations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

@Injectable()
export class OperationsService {
  constructor(
    @InjectRepository(OperationsREntity) private readonly operationRRepository: Repository<OperationsREntity>,
    @InjectRepository(OperationsDEntity) private readonly operationDRepository: Repository<OperationsDEntity>,
    private _tablesSvc: TablesService,
    private _casinoInfoSvc: CasinoInfoService,
    private _cageSvc: CageService
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

  async findAllToday(idOperationType: number): Promise<OperationsRView[]> {
    try {
      const today = await this._casinoInfoSvc.findCasinoOpeningDate().catch(err => {
        throw new Error(err.message || err);
      });

      return new Promise<OperationsRView[]>((resolve, reject) => {
        getManager().query(`select * from "vw_OperationsR" where "IdOperationType" = ${ idOperationType} and "Date" >= '${ today.toDateString() }'`).then(result => {
        // this.operationRRepository.createQueryBuilder('r')
        //   .select('r.IdOperation', 'IdOperation')
        //   .addSelect('r.IdUser', 'IdUser')
        //   .addSelect('r.Date', 'Date')
        //   .addSelect('r.IdTable', 'IdTable')
        //   .addSelect('r.Finished', 'Finished')
        //   .addSelect('r.Cancelled', 'Cancelled')
        //   .addSelect(`t.Description`, 'Table')
        //   .addSelect(`SUM(d.Denomination * d.Qty * d.Rate)`, 'Amount')
        //   .innerJoin(OperationsDEntity, 'd', 'r.IdOperation = d.IdOperation')
        //   .innerJoin(TablesEntity, 't', 't.IdTable = r.IdTable')
        //   .leftJoin(PaymentsEntity, 'p', 'p.IdPayment = d.IdPayment')
        //   .groupBy('r.IdOperation')
        //   .addGroupBy('r.IdUser')
        //   .addGroupBy('r.Date')
        //   .addGroupBy('r.IdTable')
        //   .addGroupBy('r.Finished')
        //   .addGroupBy('r.Cancelled')
        //   .addGroupBy('t.Description')
        //   .where('r.Date >= :date', { date: today.toDateString() })
        //   .andWhere('r.IdOperationType = :operType', { operType: idOperationType })
        // .execute().then(result => {
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
        this.operationDRepository.find({ IdOperation: id }).then(result => {
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
      delete operationInput.OperationR.IdOperation;

      operationInput.OperationR.Consecutive = await this.getInstrumentConsecutive(operationInput.OperationR.IdOperationType);

      operationInput.OperationR['Date'] = new Date();
      operationInput.OperationR['IdUser'] = user;

      return new Promise<OperationsREntity>((resolve, reject) => {
        this.operationRRepository.save(operationInput.OperationR).then(result => {
          operationInput.OperationD.map(d => {
            d.IdOperation = result.IdOperation
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
          operationInput.OperationD.map(d => {
            d.IdOperation = result.IdOperation;
          })
          this.operationDRepository.delete({ IdOperation: operationInput.OperationR.IdOperation }).then(() => {
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

  async finishOperation(idOperation: number): Promise<number> {
    try {
      return new Promise<number>(async (resolve, reject) => {
        getManager().findOne(OperationsRView, { IdOperation: idOperation }).then(res => {
          if (res.IdOperationType === EOperations.CREDIT && res.AmountIn !== res.AmountOut) {
            return reject('Approved Amount do not match with Delivered Amount. Fix it.');
          }
  
          this.operationRRepository.update({ IdOperation: idOperation}, { Finished: true }, ).then(result => {
            this._insertOperationInCage(idOperation).then(() => {
              resolve(result.affected);
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

  async cancelOperation(idOperation: number): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        this.operationRRepository.update({ IdOperation: idOperation}, { Cancelled: true }, ).then(result => {
          this._cageSvc.remove(idOperation).then(() => {
            resolve(result.affected);
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
  
  async finishInitialization(user: number): Promise<boolean> {
    try {
      let operationR: OperationRInput;
      
      const tables = await this._tablesSvc.findAll();

      return new Promise<boolean>(async (resolve, reject) => {
        for (let index = 0; index < tables.length; index++) {
          const t = tables[index];
 
          operationR = {
            IdTable: t.IdTable,
            IdPlayer: 0,
            IdOperationType: EOperations.INITIALIZING,
            Consecutive: await this.getInstrumentConsecutive(EOperations.INITIALIZING),
            IdUser: user,
            Finished: true,
            Date: new Date()
          };

          await this.operationRRepository.save(operationR).then(async result => {
            const operationD: OperationDInput[] = [];

            t.InitValues.map(i => {
              operationD.push({
                IdOperation: result.IdOperation,
                IdPayment: i.IdPayment,
                IdInstrument: EPaymentInstrument.CHIPS,
                Denomination: i.Payment.Denomination,
                Rate: i.Payment.Coin.Rate,
                Qty: i.Qty,
              });
            });

            await this.operationDRepository.save(operationD).catch(err => {
              reject(err.message || err);
            });
          }).catch(err => {
            reject(err.message || err);
          })
        };

        const operationDate = new Date();

        const operations = await this.findAllToday(EOperations.INITIALIZING);
        
        operations.forEach(async o => {
          await getManager().getRepository(OperationsREntity).createQueryBuilder()
            .update()
            .set({ Date: operationDate, Finished: true })
            .where('IdOperation = :idOperation', { idOperation: o.IdOperation})
          .execute().then(async res => {
            await this._insertOperationInCage(o.IdOperation).catch(err => {
              reject(err.message || err);
            });
          }).catch(err => {
            reject(err.message || err);
          })
        });

        await this._casinoInfoSvc.updateCasinoState(EOperations.OPEN, operationDate).then(() => {
          resolve(true);
        }).catch(err => {
          reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }    
  }

  async finishClosing(): Promise<boolean> {
    try {
      return new Promise<boolean>(async (resolve, reject) => {
        const operationDate = new Date();

        const pendingOperations = await this.operationRRepository.find({ Finished: false }).then(op => {
          return op;
        });

        if (pendingOperations.length) {
          reject(`There are ${ pendingOperations.length } operations that aren't Finished. You must Finish or Delete those operations.`);
          return;
        }

        await this._casinoInfoSvc.updateCasinoState(EOperations.CLOSED).then(() => {
          resolve(true);
        }).catch(err => {
          reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }    
  }

  async getInstrumentConsecutive(idOperation: number): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      getManager().query(`SELECT fn_lgs_getopnumber(${ idOperation });`).then(res => {
        resolve(res[0].fn_lgs_getopnumber || 1);
      }).catch(err => {
        reject(err.message || err);
      });
    });
  }
  
  private async _insertOperationInCage(idOperation: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      getManager().query(`CALL public.sp_lgs_insert_cage(${ idOperation })`).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err.message || err);
      });
    });
  }
}
