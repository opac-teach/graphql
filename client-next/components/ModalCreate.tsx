import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import SelectGenre from "./genre/genre.select";

interface ModalCreateProps<T extends FieldValues> {
  onConfirm: (values: T) => void;
  title: string;
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  genres?: { id: string; name: string }[];
}

export default function ModalCreate<T extends FieldValues>({
  onConfirm,
  title,
  schema,
  defaultValues,
  genres = [],
}: ModalCreateProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (values: T) => {
    try {
      onConfirm(values);
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <span>Add a {title}</span>
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>Create a {title}</DialogTitle>
              <DialogDescription>
                Create a new {title} to add to your library.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormField
                  control={form.control}
                  name={"name" as Path<T>}
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {"genreId" in form.getValues() && genres.length > 0 && (
                  <FormField
                    control={form.control}
                    name={"genreId" as Path<T>}
                    render={({ field }) => (
                      <FormItem className="col-span-4">
                        <FormLabel>Genre</FormLabel>
                        <FormControl>
                          <SelectGenre
                            genres={genres}
                            onChange={(val) => field.onChange(val)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="confirm" type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
