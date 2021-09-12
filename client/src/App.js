// @flow
import * as React from 'react';
import Page from './pages/Page';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';

function App(): React.Element<'div'> {
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [user, setUser] = React.useState();
  const handleLogin = (response) => {
    if (response.status === 'connected') {
      setLoggedIn(response.authResponse.accessToken);
      window.FB.api('/me', (userData) => {
        setUser(userData);
      });
      return;
    }
    setLoggedIn(null);
  };

  React.useEffect((): () => void => {
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

  const Environment = React.useMemo((): ?$Call<typeof RelayEnvironment, string> => {
    if (loggedIn != null) {
      return RelayEnvironment(loggedIn);
    }
    return null;
  }, [loggedIn]);

  return <div>
    {loggedIn != null && Environment != null ?
      <RelayEnvironmentProvider environment={Environment}>
        <React.Suspense fallback={'Loading...'}>
          <Page />
        </React.Suspense>
      </RelayEnvironmentProvider>
      :
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