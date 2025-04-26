import { users, songs } from "./mock-data";
import { FakeORM, DBModel, FakeDataSource } from "./FakeORM";

export interface DBUser extends DBModel {
  name: string;
}

export interface DBSong extends DBModel {
  id: string;
  name: string;
  userId: string;
}

export interface DBDataSource extends FakeDataSource {
  user: FakeORM<DBUser>;
  song: FakeORM<DBSong>;
}

export const fakeDataSource: DBDataSource = {
  user: new FakeORM<DBUser>("user", users),
  song: new FakeORM<DBSong>("song", songs),
};
