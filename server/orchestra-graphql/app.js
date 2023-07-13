const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {
  typeDefs: postTypeDefs,
  resolvers: postResolvers,
} = require("./schema/post");
const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require("./schema/user");

(async () => {

  const server = new ApolloServer({

    typeDefs: [postTypeDefs, userTypeDefs],

    resolvers: [postResolvers, userResolvers],

    introspection: true,

  });

  // Start Server
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
