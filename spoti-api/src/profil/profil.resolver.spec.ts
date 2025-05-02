import { Test, TestingModule } from '@nestjs/testing';
import { ProfilResolver } from './profil.resolver';

describe('ProfilResolver', () => {
  let resolver: ProfilResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilResolver],
    }).compile();

    resolver = module.get<ProfilResolver>(ProfilResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
