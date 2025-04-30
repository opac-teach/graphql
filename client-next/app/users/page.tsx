"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import Loading from "@/components/Loading";
import { GET_USERS } from "@/requetes/queries";
import { CREATE_USER } from "@/requetes/mutations";
import ModalCreate from "@/components/ModalCreate";
import { z } from "zod";
import { toast } from "sonner";

const userSchema = z.object({
  name: z.string().min(2),
});

export default function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  const [mutateFunction] = useMutation(CREATE_USER, {
    update(cache, { data }) {
      const newUser = data?.createUser?.user;
      if (!newUser) return;

      cache.modify({
        fields: {
          users(existingUsers = []) {
            const newUserRef = cache.writeFragment({
              data: newUser,
              fragment: gql`
                fragment NewUser on User {
                  id
                  name
                }
              `,
            });

            return [...existingUsers, newUserRef];
          },
        },
      });
    },
    onCompleted: (data) => {
      toast.success(`User ${data.createUser.user.name} created successfully!`);
    },
  });

  const create = async (values: { name: string }) => {
    await mutateFunction({
      variables: { input: { name: values.name } },
    });
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex justify-between">
        <h2>Users</h2>
        <ModalCreate
          title="user"
          schema={userSchema}
          onConfirm={create}
          defaultValues={{ name: "" }}
        />
      </div>
      <div className="flex gap-2 mt-2">
        {data?.users.map((user) => (
          <CardUser key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

function CardUser({ user }: { user: { id: string; name: string } }) {
  return <Link href={`/users/${user.id}`}>{user.name}</Link>;
}
