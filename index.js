const { ApolloServer, AuthenticationError } = require('apollo-server-lambda');
const got = require('got');
const StaticFileHandler = require('serverless-aws-static-file-handler');
const path = require('path');
const Database = require('./server/database');
const schema = require('./server/schema');
const Api = require('./server/api');

require('dotenv').config();
const IS_DEV = process.env.NODE_ENV === 'dev';
const clientFilesPath = path.join(__dirname, './client/build/');
const fileHandler = new StaticFileHandler(clientFilesPath);
const server = new ApolloServer({
  schema,
  introspection: IS_DEV,
  playground: IS_DEV,
  context: async ({ event }) => {
    const authURI = getAuthURI(event);
    const response = await got(authURI, { responseType: 'json', resolveBodyOnly: true });

    if (response.data.is_valid !== true) {
      throw new AuthenticationError('Invalid access token');
    }

    const dbServer = new Database();
    await dbServer.init();

    const [
      repeatableLists,
      repeatableListItems,
      repeatedLists,
      repeatedListItems,
    ] = Api.init({
      modules: [
        'repeatable-list',
        'repeatable-list-item',
        'repeated-list',
        'repeated-list-item',
      ],
      database: dbServer.database,
    });

    return {
      repeatableLists,
      repeatableListItems,
      repeatedLists,
      repeatedListItems,
      database: dbServer.database,
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

function getAuthURI({ headers }) {
  const accessToken = `${process.env.FB_APP_ID}|${process.env.FB_APP_SECRET}`;
  return `https://graph.facebook.com/debug_token?input_token=${headers.authtoken}&access_token=${accessToken}`;
}