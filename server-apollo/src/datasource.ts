import { users, songs, genres } from "./mock-data";
import { FakeORM, DBModel, FakeDataSource } from "./FakeORM";

export interface DBUser extends DBModel {
  name: string;
}

export interface DBGenre extends DBModel {
  name: string;
}

export interface DBSong extends DBModel {
  name: string;
  userId: string;
  genreId: string;
}

export interface Database extends FakeDataSource {
  user: FakeORM<DBUser>;
  genre: FakeORM<DBGenre>;
  song: FakeORM<DBSong>;
}

export const database: Database = {
  user: new FakeORM<DBUser>("user", users),
  genre: new FakeORM<DBGenre>("genre", genres),
  song: new FakeORM<DBSong>("song", songs),
};
