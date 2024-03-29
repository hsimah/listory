// @flow
import * as React from 'react';
import Page from 'pages/Page';
import {
  RelayEnvironmentProvider
} from 'react-relay/hooks';
import RelayEnvironment from './RelayEnvironment';

export default function App(): React.Element<'div'> {
  const [loggedIn, setLoggedIn] = React.useState <? string > (null);
  const handleLogin = (response) => {
    console.log('handleLogin');
    if (response.status === 'connected') {
      console.log('handleLogin:connected');
      setLoggedIn(response.authResponse.accessToken);
      return;
    }
    console.log('handleLogin:disconnected');
    setLoggedIn(null);
  };

  React.useEffect((): () => void => {
    window.FB.getLoginStatus(handleLogin);
    return () => { };
    //   console.log('FBObjectReady')
    // document.addEventListener('FBObjectReady', () => {
    //   console.log('FBObjectReady:connected')
    //   debugger
    //   window.FB.Event.subscribe('auth.login', handleLogin);
    //   window.FB.getLoginStatus(handleLogin);
    // });
    // return () => {
    //   if (window.FB != null) {
    //     window.FB.Event.unsubscribe('auth.login', handleLogin);
    //   }
    // };
  }, []);

  const Environment = React.useMemo((): ?$Call<typeof RelayEnvironment, string> => {
    console.log('Environment');
    if (loggedIn != null) {
      console.log('Environment:loggedin');
      return RelayEnvironment(loggedIn);
    }
    console.log('Environment:notloggedin');
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
        data-use-continue-as='true'
      // data-onlogin="checkLoginState();"
      />
    }
  </div>;
}