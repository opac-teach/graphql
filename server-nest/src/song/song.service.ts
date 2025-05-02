import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, LessThan, Repository } from 'typeorm';
import { CreateSongInput } from './dto/create-song.input';
import { UpdateSongInput } from './dto/update-song.input';
import { Song } from './model/song.model';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async findAllPaginated({
    genreId,
    cursor,
    limit,
  }: {
    genreId?: string;
    cursor?: string;
    limit: number;
  }): Promise<{ items: Song[]; nextCursor?: string; hasMore: boolean }> {
    const findOptions: FindManyOptions<Song> = {
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
      where: {
        genreId,
      },
    };

    if (cursor) {
      const [createdAtStr, id] = Buffer.from(cursor, 'base64')
        .toString('utf-8')
        .split('__');

      const createdAt = new Date(createdAtStr);
      const newDate = new Date(createdAt.getTime() + 2 * 60 * 60 * 1000);

      const formatted = newDate
        .toISOString()
        .replace('T', ' ')
        .replace('Z', '')
        .replace(/\.\d+$/, (match) => match.padEnd(7, '0'));

      console.log(
        'dateeeeee',
        createdAt,
        newDate,
        formatted,
        new Date(formatted),
      );

      // query.andWhere(
      //   '(song.createdAt < :createdAt OR (song.createdAt = :createdAt AND song.id < :id))',
      //   { createdAt, id }
      // );

      findOptions.where = [
        {
          createdAt: LessThan(createdAt),
          genreId,
        },
        {
          createdAt,
          id: LessThan(id),
          genreId,
        },
      ];
    }

    const result = await this.songRepository.find(findOptions);

    const hasMore = result.length > limit;
    const items = result.slice(0, limit);
    const lastItem = items[items.length - 1];

    console.log(
      'dateLassstt',
      result[0]?.createdAt,
      result[0]?.createdAt.toISOString(),
    ); // 2025-05-02T08:30:25.065Z 2025-05-02T08:30:25.065Z

    const nextCursor = lastItem
      ? Buffer.from(
          `${lastItem.createdAt.toISOString()}__${lastItem.id}`,
        ).toString('base64')
      : undefined;

    return {
      items,
      hasMore,
      nextCursor,
    };
  }

  async findAll({
    authorId,
    genreId,
  }: {
    authorId?: string;
    genreId?: string;
  }) {
    return await this.songRepository.find({
      where: { genreId, authorId },
    });
  }

  async findOne(id: string) {
    return await this.songRepository.findOne({
      where: { id },
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
