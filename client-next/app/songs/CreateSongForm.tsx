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
import { useMutation, useQuery } from "@apollo/client";

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

const CREATE_SONG = gql(`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
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

export default function CreateSongForm({ refetch }: { refetch: () => void }) {
	const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USERS);
	const { data: genresData, loading: genresLoading, error: genresError } = useQuery(GET_GENRES);
  const [mutateFunction, { data: createdSongData, loading: createdSongLoading, error: createdSongError }] = useMutation(CREATE_SONG);

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
      refetch();
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
