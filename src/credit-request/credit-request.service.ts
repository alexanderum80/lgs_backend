import { CreditRequestEntity } from './credit-request.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

@Injectable()
export class CreditRequestService {
  constructor(
    @InjectRepository(CreditRequestEntity) private readonly creditRequestRepository: Repository<CreditRequestEntity>
  ) {}

  async findAll(): Promise<CreditRequestEntity[]> {
    try {
      return new Promise<CreditRequestEntity[]>((resolve, reject) => {
        this.creditRequestRepository.find().then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findAllPending(): Promise<CreditRequestEntity[]> {
    try {
      return new Promise<CreditRequestEntity[]>((resolve, reject) => {
        this.creditRequestRepository.find({ where: { Passed: false, Cancelled: false }, relations: ['Player'] }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<CreditRequestEntity> {
    try {
      return new Promise<CreditRequestEntity>((resolve, reject) => {
        this.creditRequestRepository.findOne(id).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  async approve(id: number): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        getManager().query(`CALL public.sp_lgs_insert_credits_from_request(${ id })`).then(result => {
            resolve(result.affected);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  async deny(id: number): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        this.creditRequestRepository.update({ IdCredit: id }, { Cancelled: true }).then(result => {
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
