import { TablesTypeEntity } from './tables-type.entity';
import { TableTypeInput } from './tables-type.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TablesTypeService {
  constructor(
    @InjectRepository(TablesTypeEntity) private readonly tableTypeRepository: Repository<TablesTypeEntity>
  ) {}

  async findAll(): Promise<TablesTypeEntity[]> {
    try {
      return new Promise<TablesTypeEntity[]>((resolve, reject) => {
         this.tableTypeRepository.find().then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<TablesTypeEntity> {
    try {
      return new Promise<TablesTypeEntity>((resolve, reject) => {
         this.tableTypeRepository.findOne(id).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  async create(tableTypeInput: TableTypeInput): Promise<TablesTypeEntity> {
    try {
      delete tableTypeInput.IdTableType;

      return new Promise<TablesTypeEntity>((resolve, reject) => {
         this.tableTypeRepository.save(tableTypeInput).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  update(tableTypeInput: TableTypeInput) {
    try {
      return new Promise<TablesTypeEntity>((resolve, reject) => {
         this.tableTypeRepository.save(tableTypeInput).then(result => {
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
         this.tableTypeRepository.delete(IDs).then(result => {
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
