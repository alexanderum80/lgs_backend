import { InjectRepository } from '@nestjs/typeorm';
import { TablesEntity } from './tables.entity';
import { TableInput } from './tables.models';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(TablesEntity) private readonly tablesRepository: Repository<TablesEntity>
  ) {}

  async findAll(): Promise<TablesEntity[]> {
    try {
      return new Promise<TablesEntity[]>((resolve, reject) => {
         this.tablesRepository.find({ relations: ['TableGame'] }).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<TablesEntity> {
    try {
      return new Promise<TablesEntity>((resolve, reject) => {
         this.tablesRepository.findOne(id).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  async create(tableInput: TableInput): Promise<TablesEntity> {
    try {
      delete tableInput.IdTable;

      return new Promise<TablesEntity>((resolve, reject) => {
         this.tablesRepository.save(tableInput).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  update(tableInput: TableInput) {
    try {
      return new Promise<TablesEntity>((resolve, reject) => {
         this.tablesRepository.save(tableInput).then(result => {
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
         this.tablesRepository.delete(IDs).then(result => {
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
