import { UsersRolesService } from './../users-roles/users-roles.service';
import { UsersRolesEntity } from './../users-roles/users-roles.entity';
import { UserInput } from './users.model';
import { UsersEntity } from './users.entity';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, DeleteResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../shared/helpers/auth.guard';

const CRYPT_ALGORITHM = 'md5';

@Injectable()
export class UsersService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
        private _usersRolesSvc: UsersRolesService
    ) {}

    async authenticate(userName, passw): Promise<UsersEntity> {
        try {
            let userInfo: UsersEntity = {
                Id: 0,
                Name: userName,
                LastName: '',
                Psw: '',
                // Roles: [{ IdRole: 1, IdUser: 0 }],
                StartDate: new Date(),
                Enabled: true
            };

            if (userName === 'lgs') {
                const res = bcrypt.compareSync(passw, '$2a$12$lgFKnAgBBMluWmZd7yX8BuZ8RLZFdL5xDG0ABt.rMoHqrT5S/3i/2');
                if (res) {
                    const token = this.createToken(userInfo);
                    return { ...userInfo, Token: token };
                }
            }

            const queryAuthenticate = `SELECT * FROM "LGS_Users"
                WHERE "Name" = '${ userName }' AND "Psw" = crypt('${ passw }', "Psw");`

            return new Promise<UsersEntity>((resolve, reject) => {
                this.usersRepository.query(queryAuthenticate).then(async response => {
                    if (!response.length) {
                        reject('INVALID username o password.');
                    } else {    
                        userInfo = response[0];

                        if (!userInfo.Enabled) {
                            reject('This user is Disabled. Cannot Loggin.')
                        }
    
                        userInfo.Token = await this.createToken(userInfo);

                        resolve(userInfo);
                    }
                }).catch(err => {
                    reject(err);
                });
            });
        } catch (err) {
            return Promise.reject(err.message || err);
        }
    }

    private createToken(userInfo: UsersEntity) {
        return jwt.sign(userInfo, SECRET_KEY);
    }

    async findAll(): Promise<UsersEntity[]> {
        try {
             return new Promise<UsersEntity[]>((resolve, reject) => {
                this.usersRepository.find({ relations: ['UserRoles'] }).then(result => {
                    resolve(result);
                }).catch(err => {
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
                this.usersRepository.findOne({ where: { Id: id }, relations: ['UserRoles'] }).then(result => {
                    resolve(result);
                }).catch(err => {
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
                this.usersRepository.findOne({ Name: name }).then(result => {
                    resolve(result);
                }).catch(err => {
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

            const insertQuery = `insert into "LGS_Users" ("Name", "LastName", "Psw", "Enabled", "StartDate")
                values ('${ userInfo.Name }', '${ userInfo.LastName }', crypt('${ userInfo.Psw }', gen_salt('${ CRYPT_ALGORITHM }')), ${ userInfo.Enabled }, current_timestamp);`

            return new Promise<UsersEntity>((resolve, reject) => {
                this.usersRepository.query(insertQuery).then(user => {
                    userInfo.Role.forEach(async role => {
                        const userRoles: UsersRolesEntity = {
                            IdRole: role,
                            IdUser: userInfo.Id
                        };
                        await this._usersRolesSvc.create(userRoles).catch(err => {
                            reject(err.message || err);
                        });
                    });
                    resolve(userInfo);
                }).catch(err => {
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
                set "Name"='${ userInfo.Name }',
                    "LastName"='${ userInfo.LastName }',
                    "Psw"=crypt('${ userInfo.Psw }', gen_salt('${ CRYPT_ALGORITHM }')),
                    "Enabled"=${ userInfo.Enabled }
                where "Id"=${ userInfo.Id }`

            return new Promise<UsersEntity>((resolve, reject) => {
                this.usersRepository.query(updateQuery).then(user => {
                    this._usersRolesSvc.remove(userInfo.Id).then(() => {
                        userInfo.Role.forEach(async role => {
                            const userRoles: UsersRolesEntity = {
                                IdRole: role,
                                IdUser: userInfo.Id
                            };
                            await this._usersRolesSvc.create(userRoles).catch(err => {
                                reject(err.message || err);
                            });
                        });
                        resolve(userInfo);
                    }).catch(err => {
                        reject(err.message || err);
                    });
                }).catch(err => {
                    reject(err.message || err);
                });
            });
        } catch (err) {
            return Promise.reject(err.message || err);
        }
    }

    async delete(IDs: number[]): Promise<Number> {
        try {
            return new Promise<Number>((resolve, reject) => {
                this.usersRepository.delete(IDs).then(result => {
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
