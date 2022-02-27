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

  create(countryInput: CountryInput) {
    return 'This action adds a new country';
  }

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

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(countryInput: CountryInput) {
    return `This action updates a #${countryInput.IdCountry} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
