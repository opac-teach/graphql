import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongModule } from 'src/song/song.module';
import { GenreResolver } from './genre.resolver';
import { GenreService } from './genre.service';
import { Genre } from './model/genre.model';

@Module({
  imports: [TypeOrmModule.forFeature([Genre]), forwardRef(() => SongModule)],
  providers: [GenreResolver, GenreService],
  exports: [GenreService],
})
export class GenreModule {}
