import { CountryInput } from './countries.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { CountriesEntity } from './countries.entity';

@Resolver(() => CountriesEntity)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Query(() => [CountriesEntity], { name: 'getCountries' })
  async findAll(): Promise<CountriesEntity[]> {
    return this.countriesService.findAll();
  }

  @Query(() => CountriesEntity, { name: 'getCountry' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<CountriesEntity> {
    return this.countriesService.findOne(id);
  }

  @Mutation(() => CountriesEntity)
  createCountry(@Args('countryInput') countryInput: CountryInput) {
    return this.countriesService.create(countryInput);
  }

  @Mutation(() => CountriesEntity)
  updateCountry(@Args('countryInput') countryInput: CountryInput) {
    return this.countriesService.update(countryInput);
  }

  @Mutation(() => Number)
  deleteCountry(@Args('IDs', { type: () => [Int] }) IDs: number[]) {
    return this.countriesService.delete(IDs);
  }
}
