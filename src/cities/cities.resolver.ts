import { AuthGuard } from './../shared/helpers/auth.guard';
import { UseGuards } from '@nestjs/common';
import { CityInput } from './cities.model';
import { CitiesEntity } from './cities.entity';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CitiesService } from './cities.service';

@Resolver(() => CitiesEntity)
export class CitiesResolver {
  constructor(private readonly citiesService: CitiesService) {}

  @Mutation(() => CitiesEntity)
  @UseGuards(new AuthGuard())
  async createCity(@Args('cityInput') cityInput: CityInput): Promise<CitiesEntity> {
    return this.citiesService.create(cityInput);
  }

  @Query(() => [CitiesEntity], { name: 'getCities' })
  @UseGuards(new AuthGuard())
  findAll() {
    return this.citiesService.findAll();
  }

  @Query(() => [CitiesEntity], { name: 'getCitiesByCountry' })
  @UseGuards(new AuthGuard())
  findByCountry(@Args('idCountry', { type: () => Int }) idCountry: number) {
    return this.citiesService.findByIdCountry(idCountry);
  }

  @Query(() => CitiesEntity, { name: 'getCity' })
  @UseGuards(new AuthGuard())
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.citiesService.findOne(id);
  }

  @Mutation(() => CitiesEntity)
  @UseGuards(new AuthGuard())
  updateCity(@Args('cityInput') cityInput: CityInput) {
    return this.citiesService.update(cityInput);
  }

  @Mutation(() => Int)
  @UseGuards(new AuthGuard())
  removeCity(@Args('IDS', { type: () => [Int] }) IDs: number[]) {
    return this.citiesService.delete(IDs);
  }
}
