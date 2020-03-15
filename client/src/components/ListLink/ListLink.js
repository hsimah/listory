import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import React from 'react';
import { Link } from 'react-router-dom';

function ListLink({ name, listItems = [], slug, onDelete }) {
  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name, react/no-multi-comp
      React.forwardRef((linkProps, ref) =>
        <Link ref={ref} to={`list/${slug}`} {...linkProps} />
      ),
    [slug],
  );

  return <ListItem button component={renderLink}>
    <ListItemAvatar>
      <Avatar>
        <ListIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={name} secondary={`Item count: ${listItems.length}`} />
    <ListItemSecondaryAction>
      <IconButton edge='end' color='secondary' onClick={() => onDelete(slug)}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>;
}

export default ListLink;