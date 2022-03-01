import { LendersEntity } from './lenders.entity';
import { LenderInput } from './lenders.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LendersService {
  constructor(
    @InjectRepository(LendersEntity) private readonly lendersRepository: Repository<LendersEntity>
  ) {}

  async findAll(): Promise<LendersEntity[]> {
    try {
      return new Promise<LendersEntity[]>((resolve, reject) => {
         this.lendersRepository.find().then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<LendersEntity> {
    try {
      return new Promise<LendersEntity>((resolve, reject) => {
         this.lendersRepository.findOne(id).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async create(lenderInput: LenderInput): Promise<LendersEntity> {
    try {
      delete lenderInput.IdLender;

      return new Promise<LendersEntity>((resolve, reject) => {
         this.lendersRepository.save(lenderInput).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }    
  }

  async update(lenderInput: LenderInput): Promise<LendersEntity> {
    try {
      return new Promise<LendersEntity>((resolve, reject) => {
         this.lendersRepository.save(lenderInput).then(result => {
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
         this.lendersRepository.delete(IDs).then(result => {
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
