import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

function BaseLink({
  primary,
  secondary,
  slug,
  onDelete,
  type,
}) {
  const renderLink = useMemo(
    () =>
      // eslint-disable-next-line react/display-name, react/no-multi-comp
      React.forwardRef((linkProps, ref) =>
        <Link ref={ref} to={`${type}/${slug}`} {...linkProps} />
      ),
    [slug, type],
  );

  return <ListItem button component={renderLink}>
    <ListItemAvatar>
      <Avatar>
        <ListIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={primary} secondary={secondary} />
    {onDelete != null ? <ListItemSecondaryAction>
      <IconButton edge='end' color='secondary' onClick={() => onDelete(slug)}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction> : null}
  </ListItem>;
}

export default BaseLink;