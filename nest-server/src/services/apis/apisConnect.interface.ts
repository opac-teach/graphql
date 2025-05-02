import { StreamingServices } from 'src/enums/streaming-services.enum';
import { Artist } from 'src/types/artist.type';
import { Playlist } from 'src/types/playlist.type';
import { Song } from 'src/types/song.type';

export interface IApisConnect {
  init: () => Promise<void>;
  searchSongs: (
    query: string,
    serviceName?: StreamingServices,
  ) => Promise<Song[]>;
  searchArtists: (
    query: string,
    serviceName?: StreamingServices,
  ) => Promise<Artist[]>;
  searchPlaylists: (
    query: string,
    serviceName?: StreamingServices,
  ) => Promise<Playlist[]>;
  getPlaylistTracks: (
    playlistId: string,
    page: number,
    limit: number,
    serviceName?: StreamingServices,
  ) => Promise<Song[]>;
  getUserPlaylists: (
    userAccessToken: string,
    userId: string,
    serviceName?: StreamingServices,
  ) => Promise<Playlist[]>;
  addSongToPlaylist: (
    playlistId: string,
    songId: string,
    userAccessToken: string,
    userId: string,
    serviceName?: StreamingServices,
  ) => Promise<Playlist>;
  removeSongFromPlaylist: (
    playlistId: string,
    songId: string,
    userAccessToken: string,
    userId: string,
    serviceName?: StreamingServices,
  ) => Promise<Playlist>;
  convertSpotifyPlayslitToYoutube: (
    spotifyAccessToken: string,
    youtubeAccessToken: string,
    spotifyPlaylistId: string,
  ) => Promise<Playlist>;
}
