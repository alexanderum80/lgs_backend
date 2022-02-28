import { CoinEntity } from './coins.entity';
import { CoinInput } from './coins.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoinsService {
  constructor(
    @InjectRepository(CoinEntity) private readonly coinRepository: Repository<CoinEntity>
  ) {}

  async findAll(): Promise<CoinEntity[]> {
    try {
      return new Promise<CoinEntity[]>((resolve, reject) => {
         this.coinRepository.find().then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<CoinEntity> {
    try {
      return new Promise<CoinEntity>((resolve, reject) => {
         this.coinRepository.findOne(id).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async create(coinInput: CoinInput): Promise<CoinEntity> {
    try {
      delete coinInput.IdCoin;

      return new Promise<CoinEntity>((resolve, reject) => {
         this.coinRepository.save(coinInput).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async update(coinInput: CoinInput): Promise<CoinEntity> {
    try {
      return new Promise<CoinEntity>((resolve, reject) => {
         this.coinRepository.save(coinInput).then(result => {
             resolve(result);
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
         this.coinRepository.delete(IDs).then(result => {
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
