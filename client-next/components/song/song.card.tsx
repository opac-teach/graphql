import Link from "next/link";

type SongCard = {
  id: string;
  name: string;
  user: {
    id: string;
    name: string;
  };
  genre: {
    id: string;
    name: string;
  };
};

type SongCardProps = {
  song: SongCard;
};

export default function SongCard({ song }: SongCardProps) {
  return (
    <div className="border rounded-md p-4 shadow-xs hover:shadow-lg transition-shadow duration-200 ease-in-out w-[180px]">
      <Link href={`/songs/${song.id}`} className="flex flex-col gap-2 w-full">
        <h4 className="text-lg font-bold">{song.name}</h4>
        <div className="flex justify-between items-center">
          <p className="text-sm">{song.genre.name}</p>
          <p className="text-sm text-gray-500">{song.user.name}</p>
        </div>
      </Link>
    </div>
  );
}
