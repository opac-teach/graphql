'use client';

import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const CREATE_GENRE = gql`
  mutation CreateGenre($input: CreateGenreInput!) {
    createGenre(input: $input) {
      success
      genre {
        id
        name
      }
    }
  }
`;

export default function CreateGenreForm() {
  const [name, setName] = useState("");
  const [createGenre, { data, loading, error }] = useMutation(CREATE_GENRE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createGenre({ variables: { input: { name } } });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Ajouter un genre</h2>
      <input
        className="border p-2 rounded w-full"
        type="text"
        value={name}
        placeholder="Nom du genre"
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Ajouter
      </button>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">Erreur: {error.message}</p>}
      {data?.createGenre?.success && <p className="text-green-600">Genre ajouté !</p>}
    </form>
  );
}
