import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreModule } from 'src/genre/genre.module';
import { UserModule } from 'src/user/user.module';
import { Song } from './model/song.model';
import { SongResolver } from './song.resolver';
import { SongService } from './song.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Song]),
    forwardRef(() => GenreModule),
    forwardRef(() => UserModule),
  ],
  providers: [SongResolver, SongService],
  exports: [SongService],
})
export class SongModule {}
