import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemContainer from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import React from 'react';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';

export default function ListItem() {
  const { slug } = useParams();
  const { data, loading } = useQuery(ListItem.queries.GET_LIST, { variables: { slug } });

  const [removeListItem] = useMutation(
    ListItem.mutations.REMOVE_LIST_ITEM,
    {
      update(
        cache,
        { data: { upsertRepeatableListItem } }) {
        const { listItems } = cache.readQuery({ query: ListItem.queries.GET_LIST, variables: { slug } });
        cache.writeQuery({
          query: ListItem.queries.GET_LIST,
          data: { listItems: upsertRepeatableListItem.listItems },
        });
      },
    });

  if (loading) return null;

  return <List>
    {data?.repeatableList?.listItems?.map((l) =>
      <ListItemContainer key={l.id}>
        <ListItemAvatar>
          <Avatar>
            <ListIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={l.name} />
        <ListItemSecondaryAction>
          <IconButton edge='end' color='secondary' onClick={() => {
            removeListItem({
              variables: {
                list: {
                  slug,
                  item: l.slug,
                },
              },
            });
          }}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemContainer>
    )}
  </List>;
}

ListItem.fragments = {
  REPEATABLE_LIST_ITEMS: gql`
  fragment ListItem_Details on RepeatableList {
    listItems {
      id
      name
      slug
    }
  }
  `,
};

ListItem.mutations = {
  REMOVE_LIST_ITEM: gql`
  mutation ListItem_RemoveListItemToRepeatableList($slug: String!, $item: String!) {
    removeListItemToRepeatableList(input: {slug: $slug, item: $item}) {
      ...ListItem_Details
    }
  }
  ${ListItem.fragments.REPEATABLE_LIST_ITEMS}
  `,
};

ListItem.queries = {
  GET_LIST: gql`
  query ListItem_RepeatableList($slug: String!) {
    repeatableList(where: {
      slug: $slug
    }) {
      ...ListItem_Details
    }
  }
  ${ListItem.fragments.REPEATABLE_LIST_ITEMS}
  `,
};
