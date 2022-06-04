import { UsersRolesEntity } from './users-roles.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRolesInput } from './users-roles.model';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRolesService {
  constructor(
    @InjectRepository(UsersRolesEntity)
    private readonly userRolesRepository: Repository<UsersRolesEntity>,
  ) {}

  async findAll(): Promise<UsersRolesEntity[]> {
    try {
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async findOne(idUser: number): Promise<UsersRolesEntity[]> {
    try {
      return new Promise<UsersRolesEntity[]>((resolve, reject) => {
        this.userRolesRepository
          .find({ IdUser: idUser })
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async create(usersRolesInput: UsersRolesInput): Promise<UsersRolesEntity> {
    try {
      return new Promise<UsersRolesEntity>((resolve, reject) => {
        this.userRolesRepository
          .save(usersRolesInput)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async remove(idUser: number): Promise<UsersRolesEntity> {
    try {
      return new Promise<UsersRolesEntity>((resolve, reject) => {
        this.userRolesRepository
          .delete({ IdUser: idUser })
          .then(() => {
            resolve(null);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }
}
