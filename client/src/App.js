import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';
import Page from './pages/Page';
import apolloClient from './config/createApolloClient';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Page />
      </ApolloProvider>
    );
  }
}

export default App;
