import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongModule } from 'src/song/song.module';
import { User } from './model/user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => SongModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
