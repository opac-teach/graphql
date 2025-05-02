import { Test, TestingModule } from '@nestjs/testing';
import { UserLibraryResolver } from './user-library.resolver';
import { UserLibraryService } from './user-library.service';

describe('UserLibraryResolver', () => {
  let resolver: UserLibraryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserLibraryResolver, UserLibraryService],
    }).compile();

    resolver = module.get<UserLibraryResolver>(UserLibraryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
