// @flow
import * as React from 'react';
import { useFragment, useMutation } from 'react-relay';
import BaseLink from './BaseLink';
import type { ListLink$key } from './__generated__/ListLink.graphql';
import graphql from 'babel-plugin-relay/macro';

type PropType = $ReadOnly<{
  fragmentRef: ListLink$key
}>;

function ListLink({ fragmentRef }: PropType): React.Element<typeof BaseLink> {
  const data = useFragment(graphql`fragment ListLink on RepeatableList {
    id
    name
    slug
    listItems {
      __typename
    }
  }`);
  const [commit, inFlight] = useMutation(graphql`
  mutation ListLinkMutation($list: UpdateListInput!) {
    updateRepeatableList(list: $list) {
      ...ListLink
    }
  }`,);

  const handleChange = (slug: string) => {
    commit({
      variables: {
        list: {
          slug,
          archived: true,
        },
      },
    });
  };

  return <BaseLink
    primary={data?.name}
    secondary={`Item count: ${data?.listItems?.length ?? 0}`}
    onDelete={handleChange}
    slug={data?.slug}
    type='list' />;
}

export default ListLink;