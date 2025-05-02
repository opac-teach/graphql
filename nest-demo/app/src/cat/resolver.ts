import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CatService } from './cat.service';
import { CatEntity } from './cat.entity';
import { CreateCatDto } from './dtos/cat-input.dto';

@Resolver(() => CatEntity)
export class CatResolver {
  constructor(private readonly catService: CatService) {}

  @Query(() => [CatEntity])
  async cats(): Promise<CatEntity[]> {
    return this.catService.findAll({ includeBreed: true });
  }

  @Mutation(() => CatEntity)
  async createCat(
    @Args('input') input: CreateCatDto,
    @Args('ownerId', { type: () => Int }) ownerId: number,
  ): Promise<CatEntity> {
    return this.catService.create(input, ownerId);
  }
}
