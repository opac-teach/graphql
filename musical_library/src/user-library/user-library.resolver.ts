import { Resolver } from '@nestjs/graphql';
import { UserLibraryService } from './user-library.service';

@Resolver()
export class UserLibraryResolver {
  constructor(private readonly userLibraryService: UserLibraryService) {}
}
