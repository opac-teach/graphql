'use client';

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_SONG = gql`
  mutation CreateSong($input: CreateSongInput!) {
    createSong(input: $input) {
      success
      song {
        id
        name
        genreId
      }
    }
  }
`;

export default function CreateSongForm() {
  const [name, setName] = useState("");
  const [genreId, setGenreId] = useState("");
  const [createSong, { data, loading, error }] = useMutation(CREATE_SONG);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSong({ variables: { input: { name, genreId } } });
    setName("");
    setGenreId("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Ajouter une chanson</h2>
      <input
        className="border p-2 rounded w-full"
        type="text"
        value={name}
        placeholder="Nom de la chanson"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 rounded w-full"
        type="text"
        value={genreId}
        placeholder="ID du genre"
        onChange={(e) => setGenreId(e.target.value)}
        required
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded" type="submit">
        Ajouter
      </button>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">Erreur: {error.message}</p>}
      {data?.createSong?.success && <p className="text-green-600">Chanson ajoutée !</p>}
    </form>
  );
}
