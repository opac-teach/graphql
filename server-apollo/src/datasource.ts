import { users, songs, genres } from "./mock-data";
import { FakeORM, DBModel, FakeDataSource } from "./FakeORM";

export interface DBUser extends DBModel {
  name: string;
}

export interface DBSong extends DBModel {
  name: string;
  userId: string;
}

export interface DBGenre extends DBModel {
  name: string;
}

export interface Database extends FakeDataSource {
  user: FakeORM<DBUser>;
  song: FakeORM<DBSong>;
  genre: FakeORM<DBGenre>;
}

export const database: Database = {
  user: new FakeORM<DBUser>("user", users),
  song: new FakeORM<DBSong>("song", songs),
  genre: new FakeORM<DBGenre>("genre", genres),
};
