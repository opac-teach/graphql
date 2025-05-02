import { Test, TestingModule } from '@nestjs/testing';
import { SongResolver } from './songs.resolver';

describe('SongsResolver', () => {
  let resolver: SongResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SongResolver],
    }).compile();

    resolver = module.get<SongResolver>(SongResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
