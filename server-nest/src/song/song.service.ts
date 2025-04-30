import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongInput } from './dto/create-song.input';
import { Song } from './model/song.model';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async findAll(): Promise<Song[]> {
    return await this.songRepository.find();
  }

  async findOne(id: string) {
    return await this.songRepository.findOne({
      where: { id },
    });
  }

  async create(createSongInput: CreateSongInput): Promise<Song> {
    const song = this.songRepository.create(createSongInput);
    return await this.songRepository.save(song);
  }
}
