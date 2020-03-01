/* eslint-disable react/no-multi-comp */
import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import React from 'react';

const GET_LISTS = gql`
query Lists {
  lists {
    name
    type
    id
  }
}
`;

function List(props) {
  const { id, name } = props;

  return <>
    <Typography>Name: {name}</Typography>
    <Typography>ID: {id}</Typography>
  </>;
}

function Lists() {
  const { data = { lists: [] }, error, loading } = useQuery(GET_LISTS);

  if (loading) return <CircularProgress />;

  return <Grid container>
    <Grid item>
      <Typography>
        Lists
      </Typography>
    </Grid>
    <Grid item xs={12}>
      {data.lists.map((l) => <List key={l.id} name={l.name} id={l.id} />)}
    </Grid>
  </Grid>;
}

export default Lists;