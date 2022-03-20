import { CasinoInfoEntity } from './casino-info.entity';
import { CasinoInfoInput } from './casino-info.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CasinoInfoService {
  constructor(
    @InjectRepository(CasinoInfoEntity) private readonly casinoRepository: Repository<CasinoInfoEntity>
  ) {}

  async find(): Promise<CasinoInfoEntity> {
    try {
      return new Promise<CasinoInfoEntity>((resolve, reject) => {
         this.casinoRepository.findOne().then(result => {
             resolve(result);
         }).catch(err => {
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
         this.casinoRepository.findOne().then(result => {
             resolve(result.IdState);
         }).catch(err => {
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
         this.casinoRepository.save(casinoInfoInput).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }   
  }

  async updateCasinoState(idState: number): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
         this.casinoRepository.createQueryBuilder()
          .update()
          .set({ IdState: idState })
        .execute()
        .then(result => {
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
