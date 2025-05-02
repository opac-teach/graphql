import { Module } from '@nestjs/common';
import { UserLibraryService } from './user-library.service';
import { UserLibraryResolver } from './user-library.resolver';

@Module({
  providers: [UserLibraryResolver, UserLibraryService],
})
export class UserLibraryModule {}
