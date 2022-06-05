import { SessionsEntity } from './sessions.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(SessionsEntity)
    private readonly sessionRepository: Repository<SessionsEntity>,
  ) {}

  async create(date: Date): Promise<SessionsEntity> {
    try {
      return new Promise<SessionsEntity>((resolve, reject) => {
        const newSession = new SessionsEntity();
        newSession.OpenDate = date;

        this.sessionRepository
          .save(newSession)
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

  async findAll(): Promise<SessionsEntity[]> {
    try {
      return new Promise<SessionsEntity[]>((resolve, reject) => {
        this.sessionRepository
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

  async findOne(id: number): Promise<SessionsEntity> {
    try {
      return new Promise<SessionsEntity>((resolve, reject) => {
        this.sessionRepository
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

  async updateLatestSession(
    openDate?: Date,
    closeDate?: Date,
  ): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        getManager()
          .query(
            'SELECT fn_get_maxidsessions from public.fn_get_maxidsessions()',
          )
          .then((res) => {
            const idSession = res[0].fn_get_maxidsessions;

            const updateFields = {};
            if (openDate) {
              Object.assign(updateFields, { OpenDate: openDate });
            }
            if (closeDate) {
              Object.assign(updateFields, { CloseDate: closeDate });
            }
            this.sessionRepository
              .update({ IdSession: idSession }, updateFields)
              .then(async (result) => {
                if (closeDate) {
                  await this.create(new Date());
                }

                resolve(result.affected);
              })
              .catch((err) => {
                reject(err.message || err);
              });
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
