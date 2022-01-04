// @flow
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const IS_DEV = process.env.NODE_ENV !== 'production';
const URI = IS_DEV ? 'http://localhost:4000/dev/graphql' : 'https://listory.hsimah.services/graphql';

export default function RelayEnvironment(token: string): Environment {
  return new Environment({
    network: Network.create(async ({ text }, variables) => {
      const response = await fetch(URI, {
        method: 'POST',
        headers: {
          Authorization: `bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: text,
          variables,
        }),
      });

      return await response.json();
    }),
    store: new Store(new RecordSource()),
  });
}