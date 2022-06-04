import { PlayersCategoryEntity } from './players-category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersCategoryService {
  constructor(
    @InjectRepository(PlayersCategoryEntity)
    private readonly playersCategoryRepository: Repository<PlayersCategoryEntity>,
  ) {}

  async findAll(): Promise<PlayersCategoryEntity[]> {
    try {
      return new Promise<PlayersCategoryEntity[]>((resolve, reject) => {
        this.playersCategoryRepository
          .find()
          .then((res) => {
            resolve(res);
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
