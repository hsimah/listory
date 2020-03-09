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
import React from 'react';
import { useParams } from 'react-router-dom';

const styles = makeStyles((theme) => ({

}));

function ListItem({ items, onChange }) {
  const classes = styles();
  let { slug } = useParams();

  return <List>
    {items.map((l) =>
      <ListItemContainer key={l.id}>
        <ListItemAvatar>
          <Avatar>
            <ListIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={l.name} />
        <ListItemSecondaryAction>
          <IconButton edge='end' color='secondary' onClick={() => {
            const listItems = items.reduce((a, c) => {
              if (c.id !== l.id) {
                a.push(c.id);
              }
              return a;
            }, []);
            onChange({
              variables: {
                list: {
                  slug,
                  listItems,
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

export default ListItem;