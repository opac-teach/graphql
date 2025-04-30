import { Test, TestingModule } from '@nestjs/testing';
import { SongResolver } from './song.resolver';
import { SongService } from './song.service';

describe('SongResolver', () => {
  let resolver: SongResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongResolver, SongService],
    }).compile();

    resolver = module.get<SongResolver>(SongResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
