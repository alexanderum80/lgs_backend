import { CasinoInfoEntity } from './casino-info.entity';
import { CasinoInfoInput } from './casino-info.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionsService } from 'src/sessions/sessions.service';

@Injectable()
export class CasinoInfoService {
  constructor(
    @InjectRepository(CasinoInfoEntity)
    private readonly casinoRepository: Repository<CasinoInfoEntity>,
    private _sessionSvc: SessionsService,
  ) {}

  async find(): Promise<CasinoInfoEntity> {
    try {
      return new Promise<CasinoInfoEntity>((resolve, reject) => {
        this.casinoRepository
          .findOne()
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

  async findCasinoState(): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        this.casinoRepository
          .findOne()
          .then((result) => {
            resolve(result.IdState);
          })
          .catch((err) => {
            reject(err.message || err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async findCasinoOpeningDate(): Promise<Date> {
    try {
      return new Promise<Date>((resolve, reject) => {
        this.casinoRepository
          .findOne()
          .then((result) => {
            resolve(result.OpeningDate);
          })
          .catch((err) => {
            reject(err.message || err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async save(casinoInfoInput: CasinoInfoInput): Promise<CasinoInfoEntity> {
    try {
      return new Promise<CasinoInfoEntity>((resolve, reject) => {
        this.casinoRepository
          .save(casinoInfoInput)
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

  async updateCasinoState(
    idState: number,
    openingDate?: Date,
  ): Promise<number> {
    try {
      const closeDate = openingDate ? null : new Date();

      const setProperties = {
        IdState: idState,
      };
      if (openingDate) {
        setProperties['OpeningDate'] = new Date(
          openingDate.setSeconds(openingDate.getSeconds() - 10),
        );
      }

      return new Promise<number>((resolve, reject) => {
        this.casinoRepository
          .createQueryBuilder()
          .update()
          .set(setProperties)
          .execute()
          .then(async (result) => {
            // create new or update latest session
            await this._sessionSvc.updateLatestSession(openingDate, closeDate);

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
