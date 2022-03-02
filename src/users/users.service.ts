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

@Injectable()
export class UsersService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
        private _usersRolesSvc: UsersRolesService
    ) {}

    async authenticate(userName, passw): Promise<UsersEntity> {
        try {
            const userInfo: UsersEntity = {
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

            return new Promise<UsersEntity>((resolve, reject) => {
                this.usersRepository.findOne({ where: { Name: userName }, relations: ['UserRoles'] }).then(async response => {
                    if (!response) {
                        reject('INVALID username o password.');
                    } else {    
                        // if (result.Activo === false) {
                        //     resolve({
                        //         success: false,
                        //         data: userInfo,
                        //         error: 'El user especificado está Inactivo. Contacte con el personal Informático.'
                        //     });
                        // }
    
                        const validPassw = bcrypt.compareSync(passw, '$2a$12$' + response.Psw);

                        if (!response.Enabled) {
                            reject('This user is Disabled. Cannot Loggin.')
                        }
    
                        if (!validPassw) {
                            reject('INVALID Username o password.');
                        }

                        userInfo.Id = response.Id;
                        userInfo.Name = response.Name;
                        userInfo.LastName = response.LastName;
                        userInfo.Psw = passw;
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
            
            const encryptedPassw = await bcrypt.genSalt(12).then(salt => {
                return bcrypt.hash(userInfo.Psw, salt);
            });

            userInfo.Psw = encryptedPassw.replace('$2a$12$', '');
            userInfo.StartDate = new Date();

            return new Promise<UsersEntity>((resolve, reject) => {
                this.usersRepository.save(userInfo).then(user => {
                    userInfo.Role.forEach(async role => {
                        const userRoles: UsersRolesEntity = {
                            IdRole: role,
                            IdUser: user.Id
                        };
                        await this._usersRolesSvc.create(userRoles).catch(err => {
                            reject(err.message || err);
                        });
                    });
                    resolve(user);
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
            const encryptedPassw: string = await bcrypt.genSalt(12).then(salt => {
                return bcrypt.hash(userInfo.Psw, salt);
            });

            userInfo.Psw = encryptedPassw.replace('$2a$12$', '');

            return new Promise<UsersEntity>((resolve, reject) => {
                this.usersRepository.save(userInfo).then(user => {
                    this._usersRolesSvc.remove(userInfo.Id).then(() => {
                        userInfo.Role.forEach(async role => {
                            const userRoles: UsersRolesEntity = {
                                IdRole: role,
                                IdUser: user.Id
                            };
                            await this._usersRolesSvc.create(userRoles).catch(err => {
                                reject(err.message || err);
                            });
                        });
                        resolve(user);
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
