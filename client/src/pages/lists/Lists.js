/* eslint-disable react/no-multi-comp */
import { useQuery } from '@apollo/react-hooks';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListIcon from '@material-ui/icons/List';
import gql from 'graphql-tag';
import React from 'react';
import { Link } from 'react-router-dom';

const GET_LISTS = gql`
query Lists {
  lists {
    name
    type
    id
    slug
  }
}
`;

function ListLink({ id, name, listItems = [], slug }) {
  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      React.forwardRef((linkProps, ref) =>
        <Link ref={ref} to={slug} {...linkProps} />
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
  </ListItem>;
}

function Lists() {
  const { data = { lists: [] }, loading } = useQuery(GET_LISTS);

  if (loading) return <CircularProgress />;

  return <Grid container>
    <Grid item>
      <Typography variant='h3'>
        Lists
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <List>
        {data.lists.map((l) => <ListLink key={l.id} {...l} />)}
      </List>
    </Grid>
  </Grid>;
}

export default Lists;