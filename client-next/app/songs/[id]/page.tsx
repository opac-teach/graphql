"use client";

import gql from "graphql-tag";
import {useParams} from "next/navigation";
import {useQuery} from "@apollo/client";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import UpdateSongFrom from "@/app/songs/[id]/UpdateSongForm";

const GET_SONG_ID = gql(`
    query Song($songId: ID!) {
      song(id: $songId) {
        id
        name
        user {
          id
          name
        }
        genre {
          id
          name
        }
      }
    }
`)

export default function SongsId() {
    const { id } = useParams<{ id: string }>()
    const { data, loading, error, refetch } = useQuery(GET_SONG_ID, {
        variables: {
            songId: id
        }
    })

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Song</h1>
            <h3>{data?.song?.name}</h3>
            <h2>User</h2>
            <Link href={`/users/${data?.song?.user?.id}`}>
                { data?.song?.user?.name }
            </Link>
            <h2>Genre</h2>
            <h3>{ data?.song?.genre?.name }</h3>
            <UpdateSongFrom refetch={refetch} song={data?.song} />
        </div>
    );
}