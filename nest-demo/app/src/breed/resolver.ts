import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { BreedService } from './breed.service';
import { BreedEntity } from './breed.entity';
import { CreateBreedDto } from './dtos/create-breed';

@Resolver(() => BreedEntity)
export class BreedResolver {
  constructor(private readonly breedService: BreedService) {}

  @Query(() => [BreedEntity])
  async breeds(): Promise<BreedEntity[]> {
    return this.breedService.findAll();
  }

  @Mutation(() => BreedEntity)
  async createBreed(
    @Args('input') input: CreateBreedDto,
  ): Promise<BreedEntity> {
    return this.breedService.create(input);
  }
}
