"use client";

import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const DELETE_SONG = gql(`
    mutation DeleteSong($id: ID!) {
        deleteSong(id: $id) {
            success
        }
    }
`);

export default function DeleteSongButton({ songId }: { songId: string }) {
    const router = useRouter();
    const [deleteSong, { loading, error }] = useMutation(DELETE_SONG, {
        variables: { id: songId },
        onCompleted(data) {
            if (data.deleteSong.success) {
                router.push("/songs");
            }
        },
    });

    return (
        <div className="mt-4 max-w-md space-y-2">
            <Button onClick={() => deleteSong()} disabled={loading}>
                Supprimer
            </Button>
            {error && <p className="text-red-600">{error.message}</p>}
        </div>
    );
}
