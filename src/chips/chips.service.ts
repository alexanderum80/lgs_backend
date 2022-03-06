import { ChipsEntity } from './chips.entity';
import { ChipInput } from './chips.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ChipsService {
  constructor(
    @InjectRepository(ChipsEntity) private readonly chipsRepository: Repository<ChipsEntity>
  ) {}

  async findAll(): Promise<ChipsEntity[]> {
    try {
      return new Promise<ChipsEntity[]>((resolve, reject) => {
         this.chipsRepository.find().then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<ChipsEntity> {
    try {
      return new Promise<ChipsEntity>((resolve, reject) => {
         this.chipsRepository.findOne(id).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async create(chipInput: ChipInput): Promise<ChipsEntity> {
    try {
      delete chipInput.IdChip;

      return new Promise<ChipsEntity>((resolve, reject) => {
         this.chipsRepository.save(chipInput).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }
  
  async update(chipInput: ChipInput): Promise<ChipsEntity> {
    try {
      return new Promise<ChipsEntity>((resolve, reject) => {
         this.chipsRepository.save(chipInput).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async remove(IDs: number[]): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
         this.chipsRepository.delete(IDs).then(result => {
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
