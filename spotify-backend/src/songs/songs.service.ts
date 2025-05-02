import { Injectable, NotFoundException } from '@nestjs/common';
import { Song } from './models/song.model'; 
import { v4 as uuidv4 } from 'uuid'; 
import { CreateSongInput } from './dto/create-song.input';

@Injectable()
export class SongService {
  private songs: Song[] = []; 


  findAll(): Song[] {
    return this.songs;
  }


  findOne(id: string): Song {
    const song = this.songs.find((song) => song.id === id);
    if (!song) {
      throw new NotFoundException(`Song with id ${id} not found`);
    }
    return song;
  }
  
  create(createSongInput: CreateSongInput): Song {
    const newSong = {
      id: uuidv4(),
      ...createSongInput, 
    };
    this.songs.push(newSong); 
    return newSong;
  }
}
