"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQuery } from "@apollo/client";
import { Genre, Song, User } from "@/lib/graphql/graphql";
import { GET_USER, GET_USERS } from "../queries/user.query";
import { CREATE_SONG, GET_SONGS } from "../queries/song.query";
import { GET_GENRE, GET_GENRES } from "../queries/genre.query";
import { SONG_CREATION_FRAGMENT } from "../fragments/song.fragment";

export default function CreateSongForm() {
	const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
	const { data: genresData, loading: genresLoading, error: genresError } = useQuery(GET_GENRES);
  const [mutateFunction, { data: createdSongData, loading: createdSongLoading, error: createdSongError }] = useMutation(CREATE_SONG, {
    update(cache, { data }) {
      if (data && data.createSong.success) {
        const newSongRef = cache.writeFragment({
          id: `${data.createSong.song.__typename}:${data.createSong.song.id}`,
          fragment: SONG_CREATION_FRAGMENT,
          fragmentName: 'SongCreationFragment',
          data: data.createSong.song
        });

        if (newSongRef) {
          const existingSongs = cache.readQuery<{ songs: Song[] }>({ query: GET_SONGS })?.songs;

          if (existingSongs) {
            cache.writeQuery({
              id: 'ROOT_QUERY',
              query: GET_SONGS,
              data: {
                songs: [...(existingSongs || []), data.createSong.song]
              }
            });
          }

          const existingUser = cache.readQuery<{ user: User }>({ query: GET_USER, variables: { id: data.createSong.song.user.id }})?.user;
                    
          if (existingUser) {
            cache.writeQuery({
              id: 'ROOT_QUERY',
              query: GET_USER,
              variables: { id: existingUser.id },
              data: {
                user: {
                  ...existingUser,
                  songs: [...(existingUser.songs || []), data.createSong.song],
                  __typename: existingUser.__typename
                }
              }
            });
          }

          const existingGenre = cache.readQuery<{ genre: Genre }>({ query: GET_GENRE, variables: { id: data.createSong.song.genre.id }})?.genre;
                    
          if (existingGenre) {
            cache.writeQuery({
              id: 'ROOT_QUERY',
              query: GET_GENRE,
              variables: { id: existingGenre.id },
              data: {
                genre: {
                  ...existingGenre,
                  songs: [...(existingGenre.songs || []), data.createSong.song],
                  __typename: existingGenre.__typename
                }
              }
            });
          }

          const typenames = [
            { __typename: "User", id: data.createSong.song.user.id },
            { __typename: "Genre", id: data.createSong.song.genre.id },
          ];

          typenames.forEach((typename) => {
            cache.modify({
              id: cache.identify(typename),
              fields: {
                songsCount(existingSongsCount: number = 0) {
                  return existingSongsCount + 1;
                }
              },
            });
          });
        }
      }
    },
  });

  const form = useForm<{ name: string, userId: string, genreId: string }>({
    defaultValues: {
      name: "",
			userId: "",
			genreId: "",
    },
  });
	
  async function onSubmit(values: { name: string, userId: string, genreId: string }) {
    try {
      await mutateFunction({ variables: { input: { name: values.name, userId: values.userId, genreId: values.genreId } } });
    } catch (error) {
      console.error(error);
    }
  }

	if (usersLoading) return <div>Loading users...</div>;
  if (usersError) return <div>Error: {usersError.message}</div>;

	if (genresLoading) return <div>Loading genres...</div>;
  if (genresError) return <div>Error: {genresError.message}</div>;

	if (!usersData?.users.length) {
		return (
			<div>
				<span className="text-sm text-yellow-600">
					There are no users. To create a song, you must first create a user.
				</span>
			</div>
		)
	}

	if (!genresData?.genres.length) {
		return (
			<div>
				<span className="text-sm text-yellow-600">
					There are no genres. To create a song, you must first create a genre.
				</span>
			</div>
		)
	}

  return (
    <div className="mt-4 max-w-md">
      <h2 className="mb-4">Create Song</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Song name*</FormLabel>
                <FormControl>
                  <Input placeholder="See You Again" {...field} required minLength={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
					<FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username*</FormLabel>
                <FormControl>
									<Select {...field} onValueChange={field.onChange} required>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a username" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{usersData?.users.map((user: User) => (
													<SelectItem key={user.id} value={user.id}>{ user.name }</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>   
								</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
					<FormField
            control={form.control}
            name="genreId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre*</FormLabel>
                <FormControl>
									<Select {...field} onValueChange={field.onChange} required>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select a genre" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{genresData?.genres.map((genre: Genre) => (
													<SelectItem key={genre.id} value={genre.id}>{ genre.name }</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>   
								</FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
					<div>
						<span className="text-xs italic">(*) : Champ requis</span>
					</div>
          <Button type="submit" disabled={createdSongLoading}>
            Create
          </Button>
        </form>
      </Form>
      {createdSongError && <div className="text-red-500">{createdSongError.message}</div>}
      {createdSongData && (
        <div
          className={
            createdSongData.createSong.success ? "text-green-500" : "text-red-500"
          }
        >
          {createdSongData.createSong.success ? "Song created" : "Song not created"}
        </div>
      )}
    </div>
  );
}
