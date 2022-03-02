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

}
