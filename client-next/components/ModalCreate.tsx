import { GET_GENRES } from "@/requetes/queries";
import { useQuery } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pen, Plus } from "lucide-react";
import { useState } from "react";
import { DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { ZodType } from "zod";
import SelectGenre from "./genre/genre.select";
import Loading from "./Loading";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

interface ModalCreateProps<T extends FieldValues> {
  onConfirm: (values: T) => void;
  title: string;
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  isUpdate?: boolean;
}

export default function ModalCreate<T extends FieldValues>({
  onConfirm,
  title,
  schema,
  defaultValues,
  isUpdate = false,
}: ModalCreateProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, loading, error } = useQuery(GET_GENRES, {
    skip: title !== "song",
  });

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

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={isUpdate ? "ghost" : "default"}>
          <span>{!isUpdate && `Add a ${title}`}</span>
          {isUpdate ? <Pen /> : <Plus size={16} />}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
              <DialogTitle>
                {isUpdate ? "Update" : "Create"} a {title}
              </DialogTitle>
              <DialogDescription>
                {isUpdate ? "Update" : "Create"} a new {title} to add to your
                library.
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
                {data?.genres && data?.genres.length > 0 && (
                  <FormField
                    control={form.control}
                    name={"genreId" as Path<T>}
                    render={({ field }) => (
                      <FormItem className="col-span-4">
                        <FormLabel>Genre</FormLabel>
                        <FormControl>
                          <SelectGenre
                            onChange={(val) => field.onChange(val)}
                            defaultValue={field.value}
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
