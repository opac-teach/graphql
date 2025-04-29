import { DBSong, DBUser, DBGenre } from "./datasource";
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
    id: "z552715c-a078-4e3e-948d-c68f3eed1d34",
    name: "Hip Hop",
  },
  {
    id: "hr45715c-a078-jje4-948d-c68f3eed1d34",
    name: "RNB",
  },
];


export const songs: DBSong[] = [
  {
    id: uuidv4(),
    name: "Alice Hop",
    userId: users[0].id,
    genreId: genres[0].id
  },
  {
    id: uuidv4(),
    name: "Bob Drum",
    userId: users[1].id,
    genreId: genres[0].id
  },
  {
    id:uuidv4(),
    name: "Alice Drum",
    userId: users[0].id,
    genreId: genres[1].id
  },
  {
    id: uuidv4(),
    name: "Bob Hop",
    userId: users[1].id,
    genreId: genres[1].id

  },
];



