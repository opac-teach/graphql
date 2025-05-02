"use client";

import { useQuery } from "@apollo/client";
import { gql } from "@/lib/graphql";
import Link from "next/link";
import CreateUserForm from "./CreateUserForm";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


const GET_USERS = gql(`
  query Users {
    users {
      id
      name
    }
  }
`);

export default function Users() {
    const { data, loading, error, refetch } = useQuery(GET_USERS);

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Skeleton className="h-6 w-32 rounded-full" />
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="destructive" className="max-w-md mx-auto mt-8">
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
            </Alert>
        );
    }

    return (
        <div className="px-4 py-6">
            <h1 className="text-3xl font-bold mb-6">Utilisateurs</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.users.map((user) => (
                    <Link key={user.id} href={`/users/${user.id}`} className="block">
                        <Card className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                            <CardHeader className="p-0">
                                <CardTitle className="text-lg font-bold text-black">
                                    {user.name}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="mt-8 max-w-md">
                <CreateUserForm refetch={refetch} />
            </div>
        </div>
    );
}