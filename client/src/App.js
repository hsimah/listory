import React from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './config/createApolloClient';
import Page from './pages/Page';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Page />
    </ApolloProvider>
  );
}

export default App;
