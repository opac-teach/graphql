import { Injectable, Logger } from '@nestjs/common'
import axios from 'axios'
import * as process from 'process'
import * as querystring from "querystring";
import { Buffer } from 'buffer';
import {RedisService} from "../redis/redis.service";


@Injectable()
export class SpotifyService {
    private accessToken: string
    private tokenExpiration: number

    private readonly clientId: string = process.env.SPOTIFY_CLIENT_ID || 'secret'
    private readonly clientSecret: string = process.env.SPOTIFY_CLIENT_SECRET || 'secret'
    private readonly redirectUri: string = process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1/auth/spotify/callback'

    private readonly logger = new Logger(SpotifyService.name);

    constructor(
        private readonly redisService: RedisService
    ) {}

    async getAccessToken(): Promise<string | undefined> {
        const now = Date.now()
        if (this.accessToken && this.tokenExpiration > now) {
            return this.accessToken
        }
        const encodedParams = new URLSearchParams()
        encodedParams.set('grant_type', 'client_credentials')
        encodedParams.set('client_id', this.clientId)
        encodedParams.set('client_secret', this.clientSecret)

        const options = {
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            data: encodedParams,
        }

        try {
            const { data } = await axios.request(options)
            this.accessToken = data.access_token
            this.tokenExpiration = now + data.expires_in * 1000

            return this.accessToken
        } catch (error) {
            console.error(error)
        }
    }

    async login(code) {
        const data = querystring.stringify({
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.redirectUri,
        })
        const options = {
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + (Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64'))
            },
            data
        }

        return (await axios.request(options)).data
    }

    async refreshToken(userId): Promise<any> {
        const { refresh_token } = await this.redisService.getTokens(userId)
        const data = querystring.stringify({
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        })
        const options = {
            method: 'POST',
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + (Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64'))
            },
            data
        }
        const newTokens = (await axios.request(options)).data
        await this.redisService.setTokens(
            userId,
            newTokens.access_token,
            refresh_token
        )
    }

    async getMe (token): Promise<any> {
        const options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + token },
            json: true
        }

        return (await axios.request(options)).data
    }

    async request(options: object): Promise<any> {
        const token = await this.getAccessToken()
        const mergedOptions = {
            ...options,
            headers: {
                Authorization: `Bearer ${token}`,
                ...(options as any).headers
            }
        }
        return (await axios.request(mergedOptions)).data
    }

    async requestAuth(options: object, userId: string, stop = false): Promise<any> {
        const { access_token } = await this.redisService.getTokens(userId)
        const mergedOptions = {
            ...options,
            headers: {
                Authorization: `Bearer ${access_token}`,
                ...(options as any).headers
            }
        }
        try {
            return (await axios.request(mergedOptions)).data
        } catch (e) {
            if (e.status === 401 && e.response.data.error.message === 'The access token expired' && !stop) {
                await this.refreshToken(userId)
                await this.requestAuth(options, userId, true)
            }
        }
    }

    async getArtist(id: string): Promise<any> {
        const options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${id}`
        }
        return await this.request(options)
    }

    async getAlbumArtist(id: string): Promise<any> {
        const options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album%2Csingle`,
        };
        return await this.request(options)
    }

    async searchItem(value: string): Promise<any> {
        const options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/search?q=${value}&type=album%2Cartist%2Ctrack`
        }
        return await this.request(options)
    }

    async topTracks(id: string): Promise<any> {
        const options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/top-tracks'
        }
        return (await this.request(options)).tracks
    }

    async getAlbum(id: string): Promise<any> {
        const options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/albums/${id}`
        }
        return await this.request(options)
    }

    async getCurrentUser(userId) {
        const options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me',
        }
        return await this.requestAuth(options, userId)
    }

    async getCurrentUserPlaylist(userId) {
        const options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/playlists'
        }
        return await this.requestAuth(options, userId)
    }

    async getPlaylist(id) {
        const options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/playlists/${id}`
        }
        return await this.request(options)
    }

    async getPlaylistItems(userId, playlistId, limit = 20, offset = 0) {
        const options = {
            method: 'GET',
            url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            params: {
                limit,
                offset
            }
        }
        return await this.requestAuth(options, userId)
    }

    async updatePlaylist(playlistId, userId, playlist) {
        const options = {
            method: 'PUT',
            url: `https://api.spotify.com/v1/playlists/${playlistId}`,
            data: playlist
        }
        const response = await this.requestAuth(options, userId)
        console.log(response)

        return this.getPlaylist(playlistId)
    }

    async createPlaylist(userId, playlist) {
        const options = {
            method: 'POST',
            url: `https://api.spotify.com/v1/users/${userId}/playlists`,
            data: playlist
        }
        return await this.requestAuth(options, userId)
    }

    async deletePlaylist(userId, playlistId) {
        const options = {
            method: 'DELETE',
            url: `https://api.spotify.com/v1/playlists/${playlistId}/followers`
        }
        await this.requestAuth(options, userId)
        return {
            success: true
        }
    }

    async addItems(playlistId, userId, playlist) {
        const options = {
            method: 'POST',
            url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            data: playlist
        }
        return await this.requestAuth(options, userId)
    }

    async removeItems(playlistId, userId, playlist) {
        const options = {
            method: 'DELETE',
            url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
            data: playlist
        }
        return await this.requestAuth(options, userId)
    }

    async search(value, type){
        const options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/search',
            params: {
                q: value,
                type
            }
        }
        return await this.request(options)
    }
}
