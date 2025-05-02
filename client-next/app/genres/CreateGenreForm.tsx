"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { gql } from "@/lib/graphql";

const CREATE_SONG = gql(`
mutation Mutation($input: CreateGenreInput!) {
  createGenre(input: $input) {
    success
    genre {
      name
      id
    }
  }
}
`);

type FormValues = {
  name: string;
};

export default function FormSong({ refetch }: { refetch: () => void }) {
  const [createSong, { loading }] = useMutation(CREATE_SONG);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
    }
  });

  async function onSubmit(values: FormValues) {
    try {
      await createSong({ variables: { input: values } });
      refetch();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (

<div className="mt-4 max-w-md">
<Dialog>
  <DialogTrigger asChild>
    <Button>Créer un genre</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Genre</DialogTitle>
      <DialogDescription>
        Entrez un nom pour le genre musical.
      </DialogDescription>
    </DialogHeader>

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre Name</FormLabel>
              <FormControl>
                <Input placeholder="HIP HOP" {...field} minLength={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  </DialogContent>
</Dialog>

</div>

  );
}
