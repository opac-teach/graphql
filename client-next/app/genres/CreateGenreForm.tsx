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
import { gql } from "@/lib/graphql";
import { useMutation } from "@apollo/client";

const CREATE_GENRE = gql(`
  mutation CreateGenre($input: CreateGenreInput!) {
    createGenre(input: $input) {
      success
      genre {
        id
        name
      }
    }
  }
`);

export default function CreateGenreForm({ refetch }: { refetch: () => void }) {
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_GENRE);

  const form = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: { name: string }) {
    try {
      await mutateFunction({ variables: { input: { name: values.name } } });
      refetch();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="mt-4 max-w-md">
      <h2 className="mb-4">Create Genre</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre name*</FormLabel>
                <FormControl>
                  <Input placeholder="Fantastic" {...field} required minLength={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
						<span className="text-xs italic">(*) : Champ requis</span>
					</div>
          <Button type="submit" disabled={loading}>
            Create
          </Button>
        </form>
      </Form>
      {error && <div className="text-red-500">{error.message}</div>}
      {data && (
        <div
          className={
            data.createGenre.success ? "text-green-500" : "text-red-500"
          }
        >
          {data.createGenre.success ? "Genre created" : "Genre not created"}
        </div>
      )}
    </div>
  );
}
