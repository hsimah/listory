import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemContainer from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';

const GET_LIST_ITEMS = gql`
query ListItems($slug: String) {
  list(where: {
    slug: $slug
  }) {
    id
    listItems {
      id
      name
      slug
    }
  }
}
`;

const styles = makeStyles((theme) => ({

}));

function ListItem() {
  const classes = styles();
  let { slug } = useParams();
  const { data, error, loading } = useQuery(
    GET_LIST_ITEMS,
    {
      variables: {
        slug,
      },
    });

  if (loading) return null;

  if (error != null) return null;

  return <List>
    {data.list.listItems.map((l) =>
      <ListItemContainer key={l.id}>
        <ListItemAvatar>
          <Avatar>
            <ListIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={l.name} />
        <ListItemSecondaryAction>
          <IconButton edge='end' color='secondary'>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemContainer>
    )}
  </List>;
}

export default ListItem;