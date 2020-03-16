import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import Page from './pages/Page';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState();
  const handleLogin = (response) => {
    if (response.status === 'connected') {
      setLoggedIn(response.authResponse.accessToken);
      window.FB.api('/me', (userData) => {
        setUser(userData);
      });
    } else {
      setLoggedIn(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener('FBObjectReady', () => {
      window.FB.Event.subscribe('auth.login', handleLogin);
      window.FB.getLoginStatus(handleLogin);
    });
    return () => {
      if (window.FB != null) {
        window.FB.Event.unsubscribe('auth.login', handleLogin);
      }
    };
  });

  const isDev = process.env.NODE_ENV !== 'production';
  const client = new ApolloClient({
    uri: isDev ? 'http://localhost:4000/dev/graphql' : 'https://listory.hsimah.services/graphql',
    headers: {
      authtoken: loggedIn !== false ? loggedIn : '',
    },
  });

  return <div>{loggedIn ?
    <ApolloProvider client={client}>
      <Page />
    </ApolloProvider> :
    <div
      className='fb-login-button'
      data-width=''
      data-size='large'
      data-button-type='continue_with'
      data-layout='default'
      data-auto-logout-link='false'
      data-use-continue-as='false'
    />
  }
  </div>;
}

export default App;