import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Song } from 'src/song/model/song.model';
import { SongService } from 'src/song/song.service';
import { User } from './model/user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly songService: SongService,
  ) {}

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.userService.findOne(id);
  }

  @ResolveField(() => [Song])
  async songs(@Parent() user: User): Promise<Song[]> {
    return await this.songService.findAll({ authorId: user.id });
  }
}
