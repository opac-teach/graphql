import { Artist } from 'src/types/artist.type';
import { Playlist } from 'src/types/playlist.type';
import { Song } from 'src/types/song.type';

export interface IApisConnect {
  searchSongs: (query: string) => Promise<Song[]>;
  searchArtists: (query: string) => Promise<Artist[]>;
  searchPlaylists: (query: string) => Promise<Playlist[]>;
  getPlaylistTracks: (playlistId: string) => Promise<Song[]>;
  getUserPlaylists: (
    userAccessToken: string,
    userId: string,
  ) => Promise<Playlist[]>;
  addSongToPlaylist: (
    playlistId: string,
    songId: string,
    userAccessToken: string,
    userId: string,
  ) => Promise<Playlist>;
  removeSongFromPlaylist: (
    playlistId: string,
    songId: string,
    userAccessToken: string,
    userId: string,
  ) => Promise<Playlist>;
}
