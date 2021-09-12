// @flow
import ApolloClient from 'apollo-boost';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';

let TOKEN = null;

const IS_DEV = process.env.NODE_ENV !== 'production';
const URI= IS_DEV ? 'http://localhost:4000/dev/graphql' : 'https://listory.hsimah.services/graphql';

export default function (token: string): Environment {
  TOKEN = token;
  return new Environment({
    network: Network.create(fetchGraphQL),
    store: new Store(new RecordSource()),
  });
}

async function fetchGraphQL({text}, variables) {
  if (TOKEN == null) {
    return {};
  }
  const response = await fetch(URI, {
    method: 'POST',
    headers: {
      Authorization: `bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}