import { CountryInput } from './countries.model';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { CountriesEntity } from './countries.entity';

@Resolver(() => CountriesEntity)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Query(() => [CountriesEntity], { name: 'getCountries' })
  findAll() {
    return this.countriesService.findAll();
  }

  @Query(() => CountriesEntity, { name: 'getCountry' })
  findOne(@Args('id', { type: () => Int }) id: number) {
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

  @Mutation(() => CountriesEntity)
  removeCountry(@Args('id', { type: () => Int }) id: number) {
    return this.countriesService.remove(id);
  }
}
