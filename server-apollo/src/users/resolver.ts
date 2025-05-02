import { Resolvers } from "../types";

export const userResolvers: Resolvers = {
  Query: {
    users: (_, { pagination }, { dataSources }) => {
      const users = dataSources.db.user.findMany();
      const sortedUsers = users.sort((a, b) => a.id.localeCompare(b.id));   
      const page = pagination?.page ?? 1;
      const pageSize = pagination?.pageSize ?? 10;
      const offset = (page - 1) * pageSize;
    
      return sortedUsers.slice(offset, offset + pageSize);
    },
    user: (_, { id }, { dataSources }) => {
      return dataSources.db.user.findById(id);
    },
  },
  User: {
    songs: (parent, { pagination }, { dataSources }) => {
      const allSongs = dataSources.db.song.findMany({ userId: parent.id });
  
      const page = pagination?.page ?? 1;
      const pageSize = pagination?.pageSize ?? 10 ;
      const offset = (page - 1) * pageSize;
  
      return allSongs.slice(offset, offset + pageSize);}
      ,
    songsCount: (parent, _, { dataSources }) => {
      return dataSources.db.song.count({ userId: parent.id });
    }
  },
  Mutation: {
    createUser: (_, { input }, { dataSources }) => {
      const user = dataSources.db.user.create(input);
      return {
        success: true,
        user,
      };
    },
    updateUser: (_, { input }, { dataSources, userId }) => {
      const user = dataSources.db.user.update(userId,input);
      return{
        success: true,
        user,
      }
    },
    deleteUser: (_, {input}, { dataSources, userId }) => {
      const user = dataSources.db.user.findById(userId);
      if (!user) throw new Error("User not found");
      dataSources.db.user.delete(userId);
      return {
        success: true,
        user,
      }
    },

  }

};
