import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { Genre } from './model/genre.model';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find({
      relations: ['songs'],
    });
  }

  async findOne(id: string): Promise<Genre> {
    return await this.genreRepository.findOne({
      where: { id },
      relations: ['songs', 'songs.author'],
    });
  }

  async findOneByName(name: string): Promise<Genre> {
    return await this.genreRepository.findOne({
      where: { name },
    });
  }

  async create(genre: CreateGenreInput): Promise<Genre> {
    const existingGenre = await this.findOneByName(genre.name);
    if (existingGenre) {
      throw new BadRequestException('This genre already exists.');
    }

    const newGenre = this.genreRepository.create(genre);
    return await this.genreRepository.save(newGenre);
  }

  async update(id: string, updateData: UpdateGenreInput): Promise<Genre> {
    const updatedGenre = await this.genreRepository.update(id, updateData);
    if (updatedGenre.affected === 0) {
      throw new NotFoundException('Genre not found');
    }
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.genreRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Genre not found');
    }
  }
}
