import { Test, TestingModule } from '@nestjs/testing';
import { UsersRolesResolver } from './users-roles.resolver';
import { UsersRolesService } from './users-roles.service';

describe('UsersRolesResolver', () => {
  let resolver: UsersRolesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRolesResolver, UsersRolesService],
    }).compile();

    resolver = module.get<UsersRolesResolver>(UsersRolesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
