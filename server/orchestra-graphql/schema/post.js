const axios = require("axios");
const { MONGO_SERVER_URL, SQL_SERVER_URL } = require("../config/serverUrl");
const redis = require("../config/redisConnection");

const typeDefs = `#graphql
    input PostInput {
  content: String!
  authorId: String!
  categoryId: Int!
  title: String!
  imgUrl: String
  name: [String]!
    }

    input PostEditInput {
    id: Int!
  content: String
  categoryId: Int
  title: String
  imgUrl: String
    }

  type Tag {
    id: Int,
    name: String,
    postId: Int,
    createdAt: String,
    updatedAt: String
    }

    type Category {
    id: Int,
    name: String,
    createdAt: String,
    updatedAt: String
    }

  type Post {
    # Notasi tanda seru (!) menyatakan bahwa data tidak boleh kosong
    id: Int,
    title: String,
    slug: String,
    content: String,
    imgUrl: String,
    categoryId: Int,
    authorId: String,
    createdAt: String,
    updatedAt: String, 
    Category: Category
    Tags: [Tag]
  }



type User {
    # Notasi tanda seru (!) menyatakan bahwa data tidak boleh kosong
    _id: ID,
    username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String,
  }

  type PostDetail {
    # Notasi tanda seru (!) menyatakan bahwa data tidak boleh kosong
    id: Int,
    title: String,
    slug: String,
    content: String,
    imgUrl: String,
    categoryId: Int,
    authorId: String,
    createdAt: String,
    updatedAt: String,
    User: User
    Tags: [Tag]
    Category: Category
  }

  type postMutationResult{
    message: String
  }

  type postObject{
    data: PostDetail,
    message: String
  }

  

  

  type Query {
    # Di sini kita mencoba untuk membuat sebuah Query dengan nama "getAllTodos"
    # Kembaliannya berupa array of Todo
    getAllPosts: [Post],
    getPost(id: Int!): postObject
  }

  type Mutation {
    createPost(input:PostInput):postMutationResult
    deletePost(id: Int!):postMutationResult
    editPost(input:PostEditInput):postMutationResult
  }



`;

const resolvers = {
  Query: {
    getAllPosts: async () => {
      try {
        let postsCache = await redis.get("posts:get");
        if (!postsCache) {
          const { data: posts } = await axios.get(`${SQL_SERVER_URL}/posts`);
          await redis.set("posts:get", JSON.stringify(posts));
          postsCache = await redis.get("posts:get");
        }
        const posts = JSON.parse(postsCache);
        return posts;
      } catch (err) {
        return err;
      }
    },
    getPost: async (_, { id }) => {
      try {
        let postsCache = await redis.get("posts:get");
        let post = {};
        let users = [];

        if (!postsCache) {
          const { data } = await axios.get(`${SQL_SERVER_URL}/posts/${id}`);
          post = data;
        } else {
          const posts = JSON.parse(postsCache);
          post = posts.find((post) => post.id == id);
        }

        let usersCache = await redis.get("users:get");
        if (!usersCache) {
          const { data } = await axios.get(`${MONGO_SERVER_URL}/users`);
          users = data;
        } else {
          users = JSON.parse(usersCache);
        }

        let User = users.find((user) => user._id == post.authorId);

        post.User = User;
        return { data: post, message: "ok" };
      } catch (err) {
        console.log(err);
        return { message: err.response.data.message };
      }
    },
  },
  Mutation: {
    createPost: async (_, { input }) => {
      try {
        const { data } = await axios.post(`${SQL_SERVER_URL}/posts`, input);
        await redis.del("posts:get");
        return { message: data.message };
      } catch (err) {
        console.log(err);
        return { message: err.response.data.message };
      }
    },
    deletePost: async (_, { id }) => {
      try {
        const { data } = await axios.delete(`${SQL_SERVER_URL}/posts/${id}`);
        await redis.del("posts:get");
        return { message: data.message };
      } catch (err) {
        console.log(err);
        return { message: err.response.data.message };
      }
    },
    editPost: async (_, { input }) => {
      try {
        const { id, title, content, imgUrl, categoryId } = input;
        const { data } = await axios.put(`${SQL_SERVER_URL}/posts/${id}`, {
          title,
          content,
          imgUrl,
          categoryId,
        });
        await redis.del("posts:get");
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
