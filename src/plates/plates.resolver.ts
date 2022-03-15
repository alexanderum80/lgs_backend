import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlatesService } from './plates.service';
import { PlatesEntity } from './plates.entity';

@Resolver(() => PlatesEntity)
export class PlatesResolver {
  constructor(private readonly platesService: PlatesService) {}

  // @Mutation(() => PlatesEntity)
  // createPlate(@Args('createPlateInput') createPlateInput: CreatePlateInput) {
  //   return this.platesService.create(createPlateInput);
  // }

  @Query(() => [PlatesEntity], { name: 'getPlates' })
  async findAll(): Promise<PlatesEntity[]> {
    return this.platesService.findAll();
  }

  @Query(() => PlatesEntity, { name: 'getPlate' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<PlatesEntity> {
    return this.platesService.findOne(id);
  }

  // @Mutation(() => PlatesEntity)
  // updatePlate(@Args('updatePlateInput') updatePlateInput: UpdatePlateInput) {
  //   return this.platesService.update(updatePlateInput.id, updatePlateInput);
  // }

  // @Mutation(() => PlatesEntity)
  // removePlate(@Args('id', { type: () => Int }) id: number) {
  //   return this.platesService.remove(id);
  // }
}
