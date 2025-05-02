"use client";

import { useQuery, useMutation, gql } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

const GET_SONGS = gql(`
  query SongsAll {
    songs(limit: 20, offset: 0) {
      id
      name
      genre {
        name
        id
      }
      user {
        id
        name
      }
    }
  }
`);

const DELETE_SONG = gql(`
  mutation DeleteSong($songId: ID!) {
    deleteSong(songId: $songId) {
      success
    }
  }
`);

const UPDATE_SONG = gql(`
  mutation UpdateSong($input: UpdateSongInput!, $songId: ID!) {
    updateSong(name: $input, songId: $songId) {
      success
      song {
        id
        name
      }
    }
  }
`);

export default function Songs() {
  const { data, loading, error, refetch } = useQuery(GET_SONGS);
  const [deleteSong] = useMutation(DELETE_SONG);
  const [updateSong] = useMutation(UPDATE_SONG);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");

  const handleDelete = async (id: string) => {
    await deleteSong({ variables: { songId: id } });
    refetch();
  };

  const handleUpdate = async (id: string) => {
    await updateSong({ variables: { input: { name: editName }, songId: id } });
    setEditId(null);
    setEditName("");
    refetch();
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Chargement...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Erreur : {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">🎶 Liste des chansons</h1>

      <div className="space-y-6">
        {data?.songs.map((song) => (
          <div
            key={song.id}
            className="border rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800"
          >
            {editId === song.id ? (
              <div className="flex flex-col gap-2">
                <input
                  className="border px-2 py-1 rounded"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(song.id)}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href={`/songs/${song.id}`}
                  className="text-xl font-semibold text-purple-600 hover:underline"
                >
                  {song.name}
                </Link>
                <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                  Par{" "}
                  <Link
                    href={`/user/${song.user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {song.user.name}
                  </Link>{" "}
                  · Genre :{" "}
                  <Link
                    href={`/genre/${song.genre.id}`}
                    className="text-green-600 hover:underline"
                  >
                    {song.genre.name}
                  </Link>
                </p>

                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => {
                      setEditId(song.id);
                      setEditName(song.name);
                    }}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(song.id)}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded"
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
