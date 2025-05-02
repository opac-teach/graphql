import { gql } from "@/lib/graphql";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";


const DELETE_SONG = gql(`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id)
  }
`);

export default function DeleteSongForm({ songId, refetch }: { songId: string; refetch: () => void }) {
  const [deleteSong, { loading, error }] = useMutation(DELETE_SONG);

  const handleDelete = async () => {
    const confirmed = confirm("Voulez-vous vraiment supprimer cette chanson ?");
    if (!confirmed) return;

    try {
      await deleteSong({ variables: { id: songId } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={handleDelete} variant="destructive" disabled={loading}>
        Supprimer
      </Button>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </>
  );
}
