"use client";

import Loading from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CREATE_GENRE } from "@/requetes/mutations";
import { GET_GENRES } from "@/requetes/queries";
import { useMutation, useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Genre must be at least 2 characters.",
  }),
});

export default function Genres() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, loading, error, refetch } = useQuery(GET_GENRES);
  const [mutateFunction, { loading: mutationLoading }] =
    useMutation(CREATE_GENRE);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await mutateFunction({ variables: { input: { name: values.name } } });
      form.reset();
      setIsOpen(false);
      await refetch();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h2>Genres</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <span>Add a genre</span>
              <Plus size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <DialogHeader>
                  <DialogTitle>Create a genre</DialogTitle>
                  <DialogDescription>
                    Create a new genre to add to your library.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="col-span-4">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Genre name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="confirm"
                    type="submit"
                    disabled={mutationLoading}
                  >
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-2 flex-wrap justify-center mt-4">
        {data?.genres.map((genre) => (
          <Badge key={genre.id}>{genre.name}</Badge>
        ))}
      </div>
    </div>
  );
}
