import ApolloClient from 'apollo-boost';

const isDev = process.env.NODE_ENV !== 'production';

const client = new ApolloClient({
  uri: isDev ? 'http://localhost:4000/dev/graphql' : 'https://listory.hsimah.services/graphql',
});

export default client;