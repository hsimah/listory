const { ApolloServer } = require('apollo-server-lambda');
require('dotenv').config();
const path = require('path');
const StaticFileHandler = require('serverless-aws-static-file-handler');

const clientFilesPath = path.join(__dirname, './build/');
const fileHandler = new StaticFileHandler(clientFilesPath);

const schema = require('./server/schema');
const server = new ApolloServer({
  schema,
});

module.exports.graphqlHandler = server.createHandler();
module.exports.html = async (event, context) => {
  event.path = 'index.html';
  return fileHandler.get(event, context);
};