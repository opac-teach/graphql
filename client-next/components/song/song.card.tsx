import { Song } from "@/lib/graphql/graphql";
import { Music2 } from "lucide-react";
import Link from "next/link";
import GenreBadge from "../genre/genre.badge";

type SongCardProps = {
  song: Partial<Song>;
};

export default function SongCard({ song }: SongCardProps) {
  return (
    <div className="border rounded-md p-4 shadow-xs hover:shadow-lg transition-shadow duration-200 ease-in-out w-[180px]">
      <Link href={`/songs/${song.id}`} className="flex flex-col gap-2 w-full">
        <h4 className="flex items-center gap-1 text-lg font-bold">
          <Music2 size={16} />
          {song.name}
        </h4>
        <div className="flex justify-between items-center">
          <GenreBadge name={song.genre?.name} />
          <p className="text-sm text-gray-500">{song.author?.name}</p>
        </div>
      </Link>
    </div>
  );
}
