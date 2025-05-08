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
import { gql } from "@/lib/graphql";
import { Reference, useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const GET_SONG = gql(`
  query Song($id: ID!) {
    song(id: $id) {
      id
      name
      user {
        id
        name
      }
      genre {
        id
        name
      }
    }
  }
`);

const GET_USERS = gql(`
  query Users {
    users {
      id
      name
      songsCount
    }
  }
`);

const GET_GENRES = gql(`
  query Genres {
    genres {
      id
      name
      songsCount
    }
  }
`);

const UPDATE_SONG = gql(`
  mutation UpdateSong($updateSongId: ID!, $input: UpdateSongInput!) {
    updateSong(id: $updateSongId, input: $input) {
      success
      song {
				id
				name
				user {
					id
					name
				}
        genre {
					id
					name
        }
      }
    }
  }
`);

export default function UpdateSongForm() {
  const { id } = useParams<{ id: string }>();

  const { data: songData, loading: songLoading, error: songError } = useQuery(GET_SONG, {
    variables: {
      id,
    },
  });
	const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
	const { data: genresData, loading: genresLoading, error: genresError } = useQuery(GET_GENRES);
  const [mutateFunction, { data: updatedSongData, loading: updatedSongLoading, error: updatedSongError }] = useMutation(UPDATE_SONG, {
      update(cache, { data }) {
        if (data && data.updateSong.success) {
          cache.modify({
            id: cache.identify({__typename: data.updateSong.song.__typename, id: data.updateSong.song.id}),
            fields: {
              name() {
                return data.updateSong.song.name;
              },
              user() {
                return {
                  __ref: cache.identify({__typename: data.updateSong.song.user.__typename, id: data.updateSong.song.user.id})
                }
              },
              genre() {
                return {
                  __ref: cache.identify({__typename: data.updateSong.song.genre.__typename, id: data.updateSong.song.genre.id})
                }
              }
            },
          });

          if (songData) {
            cache.modify({
              id: cache.identify({ __typename: songData.song.genre.__typename, id: songData.song.genre.id }),
              fields: {
                songs(existingSongs: readonly Reference[] = [], { readField }) {
                  return existingSongs.filter(
                    (songRef) => readField('id', songRef) !== id
                  );
                },
                songsCount(existingSongsCount: number = 0) {
                  return existingSongsCount - 1;
                }
              }
            });

            cache.modify({
              id: cache.identify({ __typename: songData.song.user.__typename, id: songData.song.user.id }),
              fields: {
                songs(existingSongs: readonly Reference[] = [], { readField }) {
                  return existingSongs.filter(
                    (songRef) => readField('id', songRef) !== id
                  );
                },
                songsCount(existingSongsCount: number = 0) {
                  return existingSongsCount - 1;
                }
              }
            });

            const songRef = cache.identify({ __typename: data.updateSong.song.__typename, id })
          
            if (songRef) {
              cache.modify({
                id: cache.identify({ __typename: data.updateSong.song.genre.__typename, id: data.updateSong.song.genre.id }),
                fields: {
                  songs(existingSongs: readonly Reference[] = []) {
                    return [
                      ...existingSongs, 
                      {
                        __ref: songRef
                      }
                    ];
                  },
                  songsCount(existingSongsCount: number = 0) {
                    return existingSongsCount + 1;
                  }
                }
              });

              cache.modify({
                id: cache.identify({ __typename: data.updateSong.song.user.__typename, id: data.updateSong.song.user.id }),
                fields: {
                  songs(existingSongs: readonly Reference[] = []) {
                    return [
                      ...existingSongs, 
                      {
                        __ref: songRef
                      }
                    ];
                  },
                  songsCount(existingSongsCount: number = 0) {
                    return existingSongsCount + 1;
                  }
                }
              });
            }
          }
          
        }
      },
    });

  const form = useForm<{ name: string, userId: string, genreId: string }>({
    defaultValues: {
      name: songData?.song.name ?? "",
			userId: songData?.song.user.id ?? "",
			genreId: songData?.song.genre.id ?? "",
    },
  });
	
  async function onSubmit(values: { name: string, userId: string, genreId: string }) {
    try {
      await mutateFunction({ variables: { updateSongId: id, input: { name: values.name, userId: values.userId, genreId: values.genreId } } });
    } catch (error) {
      console.error(error);
    }
  }

  if (songLoading) return <div>Loading song...</div>;
  if (songError) return <div>Error: {songError.message}</div>;

	if (usersLoading) return <div>Loading users...</div>;
  if (usersError) return <div>Error: {usersError.message}</div>;

	if (genresLoading) return <div>Loading genres...</div>;
  if (genresError) return <div>Error: {genresError.message}</div>;

  return (
    <div className="mt-4 max-w-md">
      <h2 className="mb-4">Update Song</h2>
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
												{usersData?.users.map((user) => (
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
												{genresData?.genres.map((genre) => (
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
          <Button type="submit" disabled={updatedSongLoading}>
            Update
          </Button>
        </form>
      </Form>
      {updatedSongError && <div className="text-red-500">{updatedSongError.message}</div>}
      {updatedSongData && (
        <div
          className={
            updatedSongData.updateSong.success ? "text-green-500" : "text-red-500"
          }
        >
          {updatedSongData.updateSong.success ? "Song updated" : "Song not updated"}
        </div>
      )}
    </div>
  );
}
