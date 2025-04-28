import { ApolloServer } from "@apollo/server";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";

import { database } from "../datasource";
import { ResolversContext } from "../index";
import { resolvers, typeDefs } from "../schemas";
import { getDataLoader, getForeignDataLoader } from "../FakeORM";
import { User, CreateUserResponse } from "../types";
import assert from "assert";

describe("users resolver", () => {
  let server: ApolloServer<ResolversContext>;
  const mockUsers = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Doe" },
  ];
  const mockSongs = [
    { id: "1", name: "Song 1", userId: "1" },
    { id: "2", name: "Song 2", userId: "2" },
  ];

  const contextValue: ResolversContext = {
    userId: "",
    dataSources: {
      db: database,
    },
    loaders: {
      users: getDataLoader(database.user),
      songs: getDataLoader(database.song),
      songsByUser: getForeignDataLoader(database.song, "userId"),
    },
  };

  beforeEach(() => {
    server = new ApolloServer<ResolversContext>({
      typeDefs,
      resolvers,
    });
  });

  it("fetches users", async () => {
    const GET_USERS = `
    query GetUsers {
        users {
            id
            name
        }
    }
    `;

    jest.spyOn(database.user, "findMany").mockReturnValueOnce(mockUsers);

    const res = await server.executeOperation<{ users: User[] }>(
      {
        query: GET_USERS,
        variables: { id: 1 },
      },
      {
        contextValue,
      }
    );

    assert(res.body.kind === "single");
    expect(res.body.singleResult.errors).toBeUndefined();
    expect(res.body.singleResult.data?.users).toEqual(mockUsers);
    expect(database.user.findMany).toHaveBeenCalledWith();
  });

  it("fetches user by id", async () => {
    const GET_USER = `
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            name
        }
    }
    `;

    jest.spyOn(database.user, "findById").mockReturnValueOnce(mockUsers[0]);

    const res = await server.executeOperation<{ user: User }>(
      {
        query: GET_USER,
        variables: { id: "1" },
      },
      {
        contextValue,
      }
    );

    assert(res.body.kind === "single");
    expect(res.body.singleResult.errors).toBeUndefined();
    expect(res.body.singleResult.data?.user).toEqual(mockUsers[0]);
    expect(database.user.findById).toHaveBeenCalledWith("1");
  });

  it("fetches users with songs", async () => {
    const GET_USERS_WITH_SONGS = `
    query GetUsersWithSongs {
        users {
            id
            name
            songs {
                id
                name
            }
        }
    }
    `;

    jest.spyOn(database.user, "findMany").mockReturnValueOnce(mockUsers);
    jest.spyOn(database.song, "findMany").mockReturnValueOnce([mockSongs[0]]);
    jest.spyOn(database.song, "findMany").mockReturnValueOnce([mockSongs[1]]);

    const res = await server.executeOperation<{ users: User[] }>(
      {
        query: GET_USERS_WITH_SONGS,
        variables: { id: 1 },
      },
      {
        contextValue,
      }
    );

    assert(res.body.kind === "single");
    expect(res.body.singleResult.errors).toBeUndefined();
    expect(res.body.singleResult.data?.users).toEqual([
      {
        id: mockUsers[0].id,
        name: mockUsers[0].name,
        songs: [
          {
            id: mockSongs[0].id,
            name: mockSongs[0].name,
          },
        ],
      },
      {
        id: mockUsers[1].id,
        name: mockUsers[1].name,
        songs: [
          {
            id: mockSongs[1].id,
            name: mockSongs[1].name,
          },
        ],
      },
    ]);
    expect(database.user.findMany).toHaveBeenCalledWith();
    expect(database.song.findMany).toHaveBeenCalledWith({ userId: "1" });
    expect(database.song.findMany).toHaveBeenCalledWith({ userId: "2" });
  });

  it("creates user", async () => {
    const CREATE_USER = `
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            success
            user {
                id
                name
            }
        }
    }
    `;

    jest.spyOn(database.user, "create").mockReturnValueOnce(mockUsers[0]);

    const res = await server.executeOperation<{
      createUser: CreateUserResponse;
    }>(
      {
        query: CREATE_USER,
        variables: { input: { name: "John Doe" } },
      },
      {
        contextValue,
      }
    );

    assert(res.body.kind === "single");
    expect(res.body.singleResult.errors).toBeUndefined();
    expect(res.body.singleResult.data?.createUser).toEqual({
      success: true,
      user: {
        id: mockUsers[0].id,
        name: mockUsers[0].name,
      },
    });
    expect(database.user.create).toHaveBeenCalledWith({ name: "John Doe" });
  });
});
