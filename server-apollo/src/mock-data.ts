import { DBGenre, DBSong, DBUser } from "./datasource";
import { v4 as uuidv4 } from "uuid";

export const users: DBUser[] = [
  {
    id: "827dcc1f-062e-4c09-97cc-b0743acf16df",
    name: "Alice",
  },
  {
    id: "2fdd9781-ad40-4259-a148-c8952d82110c",
    name: "Bob",
  },
];

export const genres: DBGenre[] = [
  {
    id: uuidv4(),
    name: "Genre 1",
  },
  {
    id: uuidv4(),
    name: "Genre 2",
  },
];

export const songs: DBSong[] = [
  {
    id: uuidv4(),
    name: "Alice Hop",
    userId: users[0].id,
    genreId: genres[1].id,
  },
  {
    id: uuidv4(),
    name: "Bob Drum",
    userId: users[1].id,
    genreId: genres[1].id,
  },
  {
    id: uuidv4(),
    name: "Alice Drum",
    userId: users[0].id,
    genreId: genres[0].id,
  },
  {
    id: uuidv4(),
    name: "Bob Hop",
    userId: users[1].id,
    genreId: genres[0].id,
  },
  {
    id: uuidv4(),
    name: "Alice Hop2",
    userId: users[0].id,
    genreId: genres[1].id,
  },
  {
    id: uuidv4(),
    name: "Bob Drum2",
    userId: users[1].id,
    genreId: genres[1].id,
  },
  {
    id: uuidv4(),
    name: "Alice Drum2",
    userId: users[0].id,
    genreId: genres[0].id,
  },
  {
    id: uuidv4(),
    name: "Bob Hop2",
    userId: users[1].id,
    genreId: genres[0].id,
  },
  {
    id: uuidv4(),
    name: "Alice Hop3",
    userId: users[0].id,
    genreId: genres[1].id,
  },
  {
    id: uuidv4(),
    name: "Bob Drum3",
    userId: users[1].id,
    genreId: genres[1].id,
  },
  {
    id: uuidv4(),
    name: "Alice Drum3",
    userId: users[0].id,
    genreId: genres[0].id,
  },
  {
    id: uuidv4(),
    name: "Bob Hop3",
    userId: users[1].id,
    genreId: genres[0].id,
  },
  {
    id: uuidv4(),
    name: "Alice Hop4",
    userId: users[0].id,
    genreId: genres[1].id,
  },
  {
    id: uuidv4(),
    name: "Bob Drum4",
    userId: users[1].id,
    genreId: genres[1].id,
  },
  {
    id: uuidv4(),
    name: "Alice Drum4",
    userId: users[0].id,
    genreId: genres[0].id,
  },
  {
    id: uuidv4(),
    name: "Bob Hop4",
    userId: users[1].id,
    genreId: genres[0].id,
  },
];
