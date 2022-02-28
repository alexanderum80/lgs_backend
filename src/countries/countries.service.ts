import { CountriesEntity } from './countries.entity';
import { Injectable } from '@nestjs/common';
import { CountryInput } from './countries.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountriesEntity) private readonly countriesRepository: Repository<CountriesEntity>
  ) {}

  async findAll(): Promise<CountriesEntity[]> {
    try {
      return new Promise<CountriesEntity[]>((resolve, reject) => {
         this.countriesRepository.find().then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    }  
  }

  async findOne(id: number): Promise<CountriesEntity> {
    try {
      return new Promise<CountriesEntity>((resolve, reject) => {
         this.countriesRepository.findOne(id).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  async create(countryInput: CountryInput): Promise<CountriesEntity> {
    try {
      delete countryInput.IdCountry;

      return new Promise<CountriesEntity>((resolve, reject) => {
         this.countriesRepository.save(countryInput).then(result => {
             resolve(result);
         }).catch(err => {
             reject(err.message || err);
         });
      });
    } catch (err) {
      return Promise.reject(err.message || err);
    } 
  }

  update(countryInput: CountryInput) {
    try {
      return new Promise<CountriesEntity>((resolve, reject) => {
         this.countriesRepository.save(countryInput).then(result => {
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
         this.countriesRepository.delete(IDs).then(result => {
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
