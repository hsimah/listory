const { ApolloServer } = require('apollo-server-lambda');
require('dotenv').config();
const path = require('path');
const StaticFileHandler = require('serverless-aws-static-file-handler');
const got = require('got');
const clientFilesPath = path.join(__dirname, './client/build/');
const fileHandler = new StaticFileHandler(clientFilesPath);
const schema = require('./server/schema');
const server = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV === 'dev',
  context: async ({ event, context }) => {
    const response = await got(`https://graph.facebook.com/debug_token?input_token=${event.headers.authtoken}&access_token=${process.env.FB_APP_ID}|${process.env.FB_APP_SECRET}`, { responseType: 'json', resolveBodyOnly: true });

    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      user: {
        id: response.data.user_id,
        isValid: response.data.is_valid,
      },
    };
  },
});
const apollo = server.createHandler();

module.exports.html = (event, context, callback) => {
  if (event.path === '/graphql') {
    // GraphQL handler
    return apollo(event, context, callback);
  }

  const proxy = event.pathParameters != null ? event.pathParameters.proxy : '';

  // HTTP handler
  if (proxy.startsWith('list/')) {
    // render up html page and let react render what it wants to render
    event.pathParameters = null;
  }

  event.path = 'index.html';

  return fileHandler.get(event, context);
};