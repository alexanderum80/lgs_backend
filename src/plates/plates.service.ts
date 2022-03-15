import { PlatesEntity } from './plates.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PlatesService {
  constructor(
    @InjectRepository(PlatesEntity) private readonly platesRepository: Repository<PlatesEntity>
  ) {}
  // create(createPlateInput: CreatePlateInput) {
  //   return 'This action adds a new plate';
  // }

  async findAll(): Promise<PlatesEntity[]> {
    try {
      return new Promise<PlatesEntity[]>((resolve, reject) => {
        this.platesRepository.find({ relations: ['Coin'] }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<PlatesEntity> {
    try {
      return new Promise<PlatesEntity>((resolve, reject) => {
        this.platesRepository.findOne(id).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err.message || err);
        });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  // update(id: number, updatePlateInput: UpdatePlateInput) {
  //   return `This action updates a #${id} plate`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} plate`;
  // }
}
