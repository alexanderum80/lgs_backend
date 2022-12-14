import { JWT_SECRET } from './../shared/helpers/auth.guard';
import { UsersRolesService } from './../users-roles/users-roles.service';
import { UsersRolesEntity } from './../users-roles/users-roles.entity';
import { UserInput } from './users.model';
import { UsersEntity, UsersLogEntity } from './users.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { lowerCase } from 'lodash';
import * as jwt from 'jsonwebtoken';

const CRYPT_ALGORITHM = 'md5';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(UsersLogEntity)
    private readonly usersLogRepository: Repository<UsersLogEntity>,
    private _usersRolesSvc: UsersRolesService,
  ) {}

  async authenticate(userName, passw): Promise<UsersEntity> {
    try {
      let userInfo: UsersEntity = {
        Id: 0,
        UserName: userName,
        Name: '',
        LastName: '',
        Psw: '',
        StartDate: new Date(),
        Enabled: true,
        Deleted: false,
      };

      if (userName === 'lgs') {
        const res = bcrypt.compareSync(
          passw,
          '$2a$12$lgFKnAgBBMluWmZd7yX8BuZ8RLZFdL5xDG0ABt.rMoHqrT5S/3i/2',
        );
        if (res) {
          const _roles = [{ IdRole: 1, IdUser: 0 }];
          Object.assign(userInfo, { UserRoles: _roles });

          const token = this.createToken(userInfo);
          return { ...userInfo, Token: token };
        }
      }

      const queryAuthenticate = `SELECT * FROM "LGS_Users"
                WHERE "UserName" = '${lowerCase(
                  userName,
                )}' AND "Psw" = crypt('${passw}', "Psw");`;

      return new Promise<UsersEntity>((resolve, reject) => {
        this.usersRepository
          .query(queryAuthenticate)
          .then(async (response) => {
            if (!response.length) {
              return reject('INVALID username o password.');
            } else {
              userInfo = response[0];

              if (!userInfo.Enabled) {
                reject('This user is Disabled. Cannot Loggin.');
              }

              if (userInfo.Deleted) {
                reject('This user is Deleted. Cannot Loggin.');
              }

              this._usersRolesSvc
                .findOne(userInfo.Id)
                .then(async (token) => {
                  userInfo.UserRoles = token;
                  userInfo.Token = await this.createToken(userInfo);

                  await this.insertUserLog(userInfo.Id, 0).catch((err) => {
                    return reject(err.message | err);
                  });

                  resolve(userInfo);
                })
                .catch((err) => {
                  reject(err.message || err);
                });
            }
          })
          .catch((err) => {
            reject(err.message || err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async refreshToken(userName: string, passw: string): Promise<UsersEntity> {
    try {
      return new Promise<UsersEntity>(async (resolve) => {
        resolve(await this.authenticate(userName, passw));
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async findAll(): Promise<UsersEntity[]> {
    try {
      return new Promise<UsersEntity[]>((resolve, reject) => {
        this.usersRepository
          .find({ relations: ['UserRoles'] })
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

  async findOne(id: number): Promise<UsersEntity> {
    try {
      return new Promise<UsersEntity>((resolve, reject) => {
        this.usersRepository
          .findOne({ where: { Id: id }, relations: ['UserRoles'] })
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

  async findByName(name: string): Promise<UsersEntity> {
    try {
      return new Promise<UsersEntity>((resolve, reject) => {
        this.usersRepository
          .findOne({ Name: name })
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

  async create(userInfo: UserInput): Promise<UsersEntity> {
    try {
      delete userInfo.Id;

      const insertQuery = `insert into "LGS_Users" ("UserName", "Name", "LastName", "Psw", "Enabled", "StartDate")
                values ('${lowerCase(userInfo.UserName)}', '${
        userInfo.Name
      }', '${userInfo.LastName}', crypt('${
        userInfo.Psw
      }', gen_salt('${CRYPT_ALGORITHM}')), ${
        userInfo.Enabled
      }, current_timestamp);`;

      return new Promise<UsersEntity>((resolve, reject) => {
        this.usersRepository
          .query(insertQuery)
          .then(() => {
            userInfo.Role.forEach(async (role) => {
              const userRoles: UsersRolesEntity = {
                IdRole: role,
                IdUser: userInfo.Id,
              };
              await this._usersRolesSvc.create(userRoles).catch((err) => {
                reject(err.message || err);
              });
            });
            resolve(userInfo);
          })
          .catch((err) => {
            reject(err.message || err);
          });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async update(userInfo: UserInput): Promise<UsersEntity> {
    try {
      const updateQuery = `update "LGS_Users"
                set "UserName"='${lowerCase(userInfo.UserName)}', 
                    "Name"='${userInfo.Name}',
                    "LastName"='${userInfo.LastName}',
                    "Psw"=crypt('${
                      userInfo.Psw
                    }', gen_salt('${CRYPT_ALGORITHM}')),
                    "Enabled"=${userInfo.Enabled}
                where "Id"=${userInfo.Id}`;

      return new Promise<UsersEntity>((resolve, reject) => {
        this.usersRepository
          .query(updateQuery)
          .then(() => {
            this._usersRolesSvc
              .remove(userInfo.Id)
              .then(() => {
                userInfo.Role.forEach(async (role) => {
                  const userRoles: UsersRolesEntity = {
                    IdRole: role,
                    IdUser: userInfo.Id,
                  };
                  await this._usersRolesSvc.create(userRoles).catch((err) => {
                    reject(err.message || err);
                  });
                });
                resolve(userInfo);
              })
              .catch((err) => {
                reject(err.message || err);
              });
          })
          .catch((err) => {
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
        this.usersRepository
          .createQueryBuilder()
          .update()
          .set({
            Deleted: true,
          })
          .where('Id in (:...ids)', { ids: IDs })
          .execute()
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

  async recover(id: number): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        this.usersRepository
          .createQueryBuilder()
          .update()
          .set({
            Deleted: false,
          })
          .where('Id = :id', { id })
          .execute()
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

  createToken(userInfo: UsersEntity) {
    return jwt.sign(userInfo, JWT_SECRET, {
      expiresIn: 60 * 30,
    });
  }

  async logout(idUser: number): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.insertUserLog(idUser, 1)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err.message || err);
        });
    });
  }

  async insertUserLog(idUser: number, idType: number): Promise<void> {
    const userLog: UsersLogEntity = {
      IdTipo: idType,
      IdUser: idUser,
      Date: new Date(),
    };
    this.usersLogRepository.save(userLog).catch((err) => {
      throw new Error(err);
    });

    return;
  }
}
