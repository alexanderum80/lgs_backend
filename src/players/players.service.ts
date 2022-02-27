import { PlayerInput } from './players.model';
import { PlayersEntity } from './players.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(PlayersEntity) private readonly playersRepository: Repository<PlayersEntity>
  ) {}

  async findAll(): Promise<PlayersEntity[]> {
    try {
      return new Promise<PlayersEntity[]>((resolve, reject) => {
        this.playersRepository.find().then(result => {
          resolve(result);
        }).catch(err => {
          reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async findOne(id: number): Promise<PlayersEntity> {
    try {
      return new Promise<PlayersEntity>((resolve, reject) => {
        this.playersRepository.findOne(id).then(result => {
          resolve(result);
        }).catch(err => {
          reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }
  
  async create(playerInput: PlayerInput): Promise<PlayersEntity> {
    try {
      delete playerInput.IdPlayer;

      playerInput.StartDate = new Date();

      return new Promise<PlayersEntity>((resolve, reject) => {
        this.playersRepository.save(playerInput).then(result => {
          resolve(result);
        }).catch(err => {
          reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }
  }

  async update(playerInput: PlayerInput): Promise<PlayersEntity> {
    try {
      return new Promise<PlayersEntity>((resolve, reject) => {
        this.playersRepository.save(playerInput).then(result => {
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
        this.playersRepository.delete(IDs).then(result => {
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
