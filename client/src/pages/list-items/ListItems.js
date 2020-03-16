import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import React from 'react';
import { ListItemLink } from '../../components/Links';
import { useQuery } from 'react-apollo';

const GET_LIST_ITEMS = gql`
query ListItems {
  listItems {
    name
    id
    slug
  }
}
`;

function ListItems() {
  const { data = { listItems: [] }, loading } = useQuery(GET_LIST_ITEMS);

  if (loading) return <CircularProgress />;

  return <Grid container>
    <Grid item>
      <Typography variant='h3'>
        {'List Items'}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <List>
        {data.listItems.map((l) => <ListItemLink key={l.id} {...l} />)}
      </List>
    </Grid>
  </Grid>;
}

export default ListItems;