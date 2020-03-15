const { ApolloServer } = require('apollo-server-lambda');
require('dotenv').config();
const path = require('path');
const StaticFileHandler = require('serverless-aws-static-file-handler');

const clientFilesPath = path.join(__dirname, './client/build/');
const fileHandler = new StaticFileHandler(clientFilesPath);
const schema = require('./server/schema');
const server = new ApolloServer({
  schema,
  playground: true,
});

const apollo = server.createHandler();

module.exports.html = (event, context, callback) => {
  if (event.path === '/graphql') {
    // GraphQL handler
    return apollo(event, context, callback);
  }

  event.path = 'index.html';
  return fileHandler.get(event, context);
};