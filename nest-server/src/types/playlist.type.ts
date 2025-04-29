import { Song } from './song.type';

export type Playlist = {
  id: string;
  name: string;
  description: string;
  coverImageUrl: string;
  songs: Song[];
};
