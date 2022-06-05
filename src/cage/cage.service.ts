import { CageEntity } from './cage.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CageInput } from './cage.model';
import { Repository } from 'typeorm';

@Injectable()
export class CageService {
  constructor(
    @InjectRepository(CageEntity)
    private readonly cageRepository: Repository<CageEntity>,
  ) {}

  async findAll(): Promise<CageEntity[]> {
    try {
      return new Promise<CageEntity[]>((resolve, reject) => {
        this.cageRepository
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

  async findOne(id: number): Promise<CageEntity> {
    try {
      return new Promise<CageEntity>((resolve, reject) => {
        this.cageRepository
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

  async create(cageInput: CageInput): Promise<CageEntity> {
    try {
      return new Promise<CageEntity>((resolve, reject) => {
        this.cageRepository
          .save(cageInput)
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

  async remove(idOperation: number): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        this.cageRepository
          .delete({ IdOperation: idOperation })
          .then((result) => {
            resolve(result.affected);
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
