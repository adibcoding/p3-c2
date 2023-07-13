const axios = require("axios");
const { MONGO_SERVER_URL, SQL_SERVER_URL } = require("../config/serverUrl");
const redis = require("../config/redisConnection");
const typeDefs = `#graphql

input userCreateInput {
    username: String!
    email: String!
    password: String!
    phoneNumber: String
    address: String
    }


  
  type User {
    # Notasi tanda seru (!) menyatakan bahwa data tidak boleh kosong
    _id: ID
    username: String
    email: String
    phoneNumber: String
    address: String
  }
  type userResponse {
    data: User,
    message: String
  }
  type userMutationResult{
    message: String
  }




  type Query {
    # Di sini kita mencoba untuk membuat sebuah Query dengan nama "getAllTodos"
    # Kembaliannya berupa array of Todo
    getAllUsers: [User],
    getUser(_id: ID!): userResponse
  }

  type Mutation {
    createUser(input:userCreateInput):userMutationResult
    deleteUser(_id: ID!):userMutationResult
  }



`;

const resolvers = {
  Query: {
    getAllUsers: async () => {
      // Jangan lupa bila nanti harus ada cache, di cache di redis yah !
      try {
        let usersCache = await redis.get("users:get");

        if (!usersCache) {
          const { data: users } = await axios.get(`${MONGO_SERVER_URL}/users`);
          await redis.set("users:get", JSON.stringify(users));
          usersCache = await redis.get("users:get");
        }
        const users = JSON.parse(usersCache);
        return users;
      } catch (err) {
        return err;
      }
    },
    getUser: async (_, { _id }) => {
      try {
        let usersCache = await redis.get("users:get");
        let user = {};

        if (!usersCache) {
          const { data } = await axios.get(`${MONGO_SERVER_URL}/users/${_id}`);
          user = data;
        } else {
          let users = JSON.parse(usersCache);
          user = users.find((user) => user._id == _id);
        }
        return { message: "ok", data: user };
      } catch (err) {
        console.log(err.response);
        return { message: err.response.data.message };
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const { data } = await axios.post(`${MONGO_SERVER_URL}/users`, input);
        await redis.del("users:get");
        return { message: data.message };
      } catch (err) {
        console.log(err);
        return { message: err.response.data.message };
      }
    },
    deleteUser: async (_, { _id }) => {
      try {
        const { data } = await axios.delete(`${MONGO_SERVER_URL}/users/${_id}`);
        await redis.del("users:get");
        return { message: data.message };
      } catch (err) {
        console.log(err);
        return { message: err.response.data.message };
      }
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
