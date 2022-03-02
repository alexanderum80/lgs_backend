import { CityInput } from './cities.model';
import { CitiesEntity } from './cities.entity';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CitiesService } from './cities.service';

@Resolver(() => CitiesEntity)
export class CitiesResolver {
  constructor(private readonly citiesService: CitiesService) {}

  @Mutation(() => CitiesEntity)
  createCity(@Args('cityInput') cityInput: CityInput) {
    return this.citiesService.create(cityInput);
  }

  @Query(() => [CitiesEntity], { name: 'getCities' })
  findAll() {
    return this.citiesService.findAll();
  }

  @Query(() => [CitiesEntity], { name: 'getCitiesByCountry' })
  findByCountry(@Args('idCountry', { type: () => Int }) idCountry: number) {
    return this.citiesService.findByIdCountry(idCountry);
  }

  @Query(() => CitiesEntity, { name: 'getCity' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.citiesService.findOne(id);
  }

  @Mutation(() => CitiesEntity)
  updateCity(@Args('cityInput') cityInput: CityInput) {
    return this.citiesService.update(cityInput);
  }

  @Mutation(() => CitiesEntity)
  removeCity(@Args('IDS', { type: () => [Int] }) IDs: number[]) {
    return this.citiesService.delete(IDs);
  }
}
