"use client";

import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { gql } from "@/lib/graphql";
import { GET_SONGINFO } from "./page";

const DELETE_SONG = gql(`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      success
    }
  }
`);

export default function DeleteSongButton({ onDeleted }: { onDeleted: () => void }) {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [deleteSong, { loading }] = useMutation(DELETE_SONG);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      const { data } = await deleteSong({ variables: { id } });

      if (data?.deleteSong?.success) {
        setMessage("Le son a bien été supprimé !");
        setError(null);
        setTimeout(() => {
          router.push("/songs");
        }, 3000);
      } else {
        setError("La suppression a échoué.");
        setMessage(null);
      }
    } catch (err: any) {
      console.error("Erreur lors de la suppression :", err);
      setError("Une erreur est survenue lors de la suppression.");
      setMessage(null);
    }
  };

  return (
    <div className="mt-4 max-w-md space-y-2">
      {error && <p className="text-red-600">{error}</p>}

      {message ? (
        <p className="text-green-600 text-center">{message}</p>
      ) : (
        <Button onClick={handleDelete} disabled={loading}>
          {loading ? "Suppression..." : "Supprimer"}
        </Button>
      )}
    </div>
  );
}
