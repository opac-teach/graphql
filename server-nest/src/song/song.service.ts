import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongInput } from './dto/create-song.input';
import { UpdateSongInput } from './dto/update-song.input';
import { Song } from './model/song.model';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async findAll(genreId?: string): Promise<Song[]> {
    return await this.songRepository.find({
      relations: ['author', 'genre'],
      where: { genreId },
    });
  }

  async findOne(id: string) {
    return await this.songRepository.findOne({
      where: { id },
      relations: ['author', 'genre'],
    });
  }

  async create(
    createSongInput: CreateSongInput,
    userId: string,
  ): Promise<Song> {
    const song = this.songRepository.create({
      ...createSongInput,
      authorId: userId,
    });
    return await this.songRepository.save(song);
  }

  async update(
    id: string,
    updateData: UpdateSongInput,
    authorId: string,
  ): Promise<Song> {
    const updatedSong = await this.songRepository.update(
      { id, authorId },
      updateData,
    );

    if (updatedSong.affected === 0) {
      throw new NotFoundException('Song not found');
    }
    return this.findOne(id);
  }

  async remove(id: string, authorId: string): Promise<void> {
    const result = await this.songRepository.delete({ id, authorId });
    if (result.affected === 0) {
      throw new NotFoundException('Song not found');
    }
  }
}
