import React from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './config/createApolloClient';
import Page from './pages/Page';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const handleLogin = (response) => {
    if (response.status === 'connected') {
      window.FB.api('/me', (userData) => {
        setLoggedIn(true);
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

  return <ApolloProvider client={apolloClient}>
    {loggedIn ? <Page /> : <div>
      <div
        className='fb-login-button'
        data-width=''
        data-size='large'
        data-button-type='continue_with'
        data-layout='default'
        data-auto-logout-link='false'
        data-use-continue-as='false'
      />
    </div>}
  </ApolloProvider>;
}

export default App;