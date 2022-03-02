import { CityInput } from './cities.model';
import { CitiesEntity } from './cities.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CitiesEntity) private readonly citiesRepository: Repository<CitiesEntity>
  ) {}

  async findAll(): Promise<CitiesEntity[]> {
    try {
      return new Promise<CitiesEntity[]>((resolve, reject) => {
         this.citiesRepository.find({ relations: ['Country']}).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }
  
  async findByIdCountry(IdCountry: number): Promise<CitiesEntity[]> {
    try {
      return new Promise<CitiesEntity[]>((resolve, reject) => {
         this.citiesRepository.find({ IdCountry }).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<CitiesEntity> {
    try {
      return new Promise<CitiesEntity>((resolve, reject) => {
         this.citiesRepository.findOne(id).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  async create(cityInput: CityInput): Promise<CitiesEntity> {
    try {
      delete cityInput.IdCity;

      return new Promise<CitiesEntity>((resolve, reject) => {
         this.citiesRepository.save(cityInput).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  update(cityInput: CityInput) {
    try {
      return new Promise<CitiesEntity>((resolve, reject) => {
         this.citiesRepository.save(cityInput).then(result => {
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
         this.citiesRepository.delete(IDs).then(result => {
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
