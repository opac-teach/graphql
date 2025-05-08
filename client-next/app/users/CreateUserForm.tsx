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
import { Reference, useMutation } from "@apollo/client";

const CREATE_USER = gql(`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      user {
        id
        name
      }
    }
  }
`);

export default function CreateUserForm() {
  const [mutateFunction, { data, loading, error }] = useMutation(CREATE_USER, {
      update(cache, { data }) {
        if (data?.createUser.success) {
          const newUserRef = cache.writeFragment({
            id: `${data?.createUser.user.__typename}:${data?.createUser.user.id}`,
            fragment: gql(`
              fragment NewUser on User {
                __typename
                id
                name
              }
            `),
            data: data?.createUser.user
          });
  
          if (newUserRef) {
            cache.modify({
              id: 'ROOT_QUERY',
              fields: {
                users(existingUsers: readonly Reference[] = []) {
                  return [...existingUsers, newUserRef];
                }
              },
            });
          }
        }
      },
    });

  const form = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    },
  });
  async function onSubmit(values: { name: string }) {
    try {
      await mutateFunction({ variables: { input: { name: values.name } } });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="mt-4 max-w-md">
      <h2 className="mb-4">Create User</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username*</FormLabel>
                <FormControl>
                  <Input placeholder="Charly" {...field} minLength={3} />
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
            data.createUser.success ? "text-green-500" : "text-red-500"
          }
        >
          {data.createUser.success ? "User created" : "User not created"}
        </div>
      )}
    </div>
  );
}
