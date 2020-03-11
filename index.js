const { ApolloServer } = require('apollo-server-lambda');
const schema = require('./server/schema');

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
});

module.exports.graphqlHandler = server.createHandler();