import { RolesEntity } from './roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleInput } from './roles.model';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity) private readonly rolesRepository: Repository<RolesEntity>
  ) {}

  async findAll(): Promise<RolesEntity[]> {
    try {
      return new Promise<RolesEntity[]>((resolve, reject) => {
        this.rolesRepository.find().then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        })
      })
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async findOne(id: number): Promise<RolesEntity> {
    try {
      return new Promise<RolesEntity>((resolve, reject) => {
        this.rolesRepository.findOne(id).then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        })
      })
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }
  
  async create(roleInput: RoleInput): Promise<RolesEntity> {
    try {
      delete roleInput.IdRole;

      return new Promise<RolesEntity>((resolve, reject) => {
        this.rolesRepository.save(roleInput).then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        })
      })
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async update(roleInput: RoleInput): Promise<RolesEntity> {
    try {
      return new Promise<RolesEntity>((resolve, reject) => {
        this.rolesRepository.save(roleInput).then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        })
      })
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async delete(id: number): Promise<RolesEntity> {
    try {
      return new Promise<RolesEntity>((resolve, reject) => {
        this.rolesRepository.delete(id).then(result => {
          resolve(null);
        }).catch(err => {
          reject(err);
        })
      })
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }
}
