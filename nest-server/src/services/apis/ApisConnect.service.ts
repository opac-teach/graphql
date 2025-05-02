import { Artist } from 'src/types/artist.type';
import { Song } from 'src/types/song.type';
import { IApisConnect } from './apisConnect.interface';
import { Playlist } from 'src/types/playlist.type';
import { SpotifyConnect } from './spotify/Spotify.connect';
import { DeezerConnect } from './deezer/DeezerConnect';
import { StreamingServices } from 'src/enums/streaming-services.enum';
import { Injectable } from '@nestjs/common';
import { YoutubeConnect } from './youtube/youtube.connect';

@Injectable()
export class ApisConnect implements IApisConnect {
  private spotityInstance: SpotifyConnect;
  private deezerInstance: DeezerConnect;
  private youtubeInstance: YoutubeConnect;

  constructor() {}

  private getInstance(
    serviceName: StreamingServices,
  ): SpotifyConnect | DeezerConnect | YoutubeConnect {
    switch (serviceName) {
      case StreamingServices.SPOTIFY:
        return this.spotityInstance;
      case StreamingServices.DEEZER:
        return this.deezerInstance;
      case StreamingServices.YOUTUBE:
        return this.youtubeInstance;
      default:
        throw new Error('Invalid service name');
    }
  }

  public async init(): Promise<void> {
    this.spotityInstance = new SpotifyConnect();
    this.deezerInstance = new DeezerConnect();
    this.youtubeInstance = new YoutubeConnect();

    await Promise.all([
      this.spotityInstance.init(),
      this.deezerInstance.init(),
      this.youtubeInstance.init(),
    ]);
  }

  public async searchSongs(
    query: string,
    serviceName: StreamingServices,
  ): Promise<Song[]> {
    return await this.getInstance(serviceName).searchSongs(query);
  }

  public async searchArtists(
    query: string,
    serviceName: StreamingServices,
  ): Promise<Artist[]> {
    return await this.getInstance(serviceName).searchArtists(query);
  }

  public async searchPlaylists(
    query: string,
    serviceName: StreamingServices,
  ): Promise<Playlist[]> {
    return await this.getInstance(serviceName).searchPlaylists(query);
  }

  public async getPlaylistTracks(
    query: string,
    page: number = 1,
    limit: number = 10,
    serviceName: StreamingServices,
  ): Promise<Song[]> {
    return await this.getInstance(serviceName).getPlaylistTracks(query);
  }

  public async getUserPlaylists(
    userAccessToken: string,
    userId: string,
    serviceName: StreamingServices,
  ): Promise<Playlist[]> {
    return await this.getInstance(serviceName).getUserPlaylists(
      userAccessToken,
      userId,
    );
  }

  public async addSongToPlaylist(
    playlistId: string,
    songId: string,
    userAccessToken: string,
    userId: string,
    serviceName: StreamingServices,
  ): Promise<Playlist> {
    return await this.getInstance(serviceName).addSongToPlaylist(
      playlistId,
      songId,
      userAccessToken,
      userId,
    );
  }

  public async removeSongFromPlaylist(
    playlistId: string,
    songId: string,
    userAccessToken: string,
    userId: string,
    serviceName: StreamingServices,
  ): Promise<Playlist> {
    return await this.getInstance(serviceName).removeSongFromPlaylist(
      playlistId,
      songId,
      userAccessToken,
      userId,
    );
  }

  public async convertSpotifyPlayslitToYoutube(
    spotifyAccessToken: string,
    youtubeAccessToken: string,
    spotifyPlaylistId: string,
  ): Promise<Playlist> {
    const spotifyPlaylist = await this.spotityInstance.getUserPlaylistsById(
      spotifyAccessToken,
      spotifyPlaylistId,
      true,
    );
    const spotifyPlaylistSongs = spotifyPlaylist.songs;
    const youtubePlaylist = await this.youtubeInstance.createPlaylist(
      spotifyPlaylist.name,
      youtubeAccessToken,
    );

    for (const song of spotifyPlaylistSongs as any[]) {
      const query = `${song.name} ${song.artist}`;
      const youtubeSongs = await this.youtubeInstance.searchSongs(query);
      const youtubeSong = youtubeSongs[0];
      await this.youtubeInstance.addSongToPlaylistById(
        youtubePlaylist.id,
        youtubeSong.id,
        youtubeAccessToken,
      );
    }

    const updatedYoutubePlaylist =
      await this.youtubeInstance.getUserPlaylistsById(
        youtubeAccessToken,
        youtubePlaylist.id,
      );

    console.log(updatedYoutubePlaylist);

    return updatedYoutubePlaylist;
  }
}
