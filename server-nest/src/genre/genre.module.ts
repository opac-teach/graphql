import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreResolver } from './genre.resolver';
import { GenreService } from './genre.service';
import { Genre } from './model/genre.model';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenreResolver, GenreService],
})
export class GenreModule {}
