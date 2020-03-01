import React, { Component } from 'react';

import { ApolloProvider } from 'react-apollo';

import apolloClient from './config/createApolloClient';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <h1>Listory</h1>
      </ApolloProvider>
    );
  }
}

export default App;
