import { TablesGameEntity } from './tables-game.entity';
import { TableGameInput } from './tables-game.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TablesGameService {
  constructor(
    @InjectRepository(TablesGameEntity) private readonly tableGameRepository: Repository<TablesGameEntity>
  ) {}

  async findAll(): Promise<TablesGameEntity[]> {
    try {
      return new Promise<TablesGameEntity[]>((resolve, reject) => {
         this.tableGameRepository.find().then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<TablesGameEntity> {
    try {
      return new Promise<TablesGameEntity>((resolve, reject) => {
         this.tableGameRepository.findOne(id).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  async create(tableGameInput: TableGameInput): Promise<TablesGameEntity> {
    try {
      delete tableGameInput.IdGame;

      return new Promise<TablesGameEntity>((resolve, reject) => {
         this.tableGameRepository.save(tableGameInput).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  update(tableGameInput: TableGameInput) {
    try {
      return new Promise<TablesGameEntity>((resolve, reject) => {
         this.tableGameRepository.save(tableGameInput).then(result => {
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
         this.tableGameRepository.delete(IDs).then(result => {
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
