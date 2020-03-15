import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import React from 'react';
import ListLink from '../../components/Links/ListLink';
import { useMutation } from 'react-apollo';

const GET_LISTS = gql`
query Lists {
  lists {
    name
    type
    id
    slug
    archived
  }
}
`;

const UPDATE_LIST = gql`
mutation UpdateList($list: ListInput!) {
  updateList(list: $list) {
    id
    name
    type
    slug
    archived
    listItems {
      id
      name
    }
  }
}
`;

function Lists() {
  const { data = { lists: [] }, loading } = useQuery(GET_LISTS);

  const [updateList] = useMutation(
    UPDATE_LIST,
    {
      update(cache, { data: { updateList } }) {
        const { lists } = cache.readQuery({ query: GET_LISTS });
        cache.writeQuery({
          query: GET_LISTS,
          data: { lists: lists.filter((l) => !l.archived) },
        });
      },
    });

  const handleChange = (slug) => {
    const list = {
      slug,
      archived: true,
    };
    updateList({
      variables: {
        list,
      },
    });
  };

  if (loading) return <CircularProgress />;

  return <Grid container>
    <Grid item>
      <Typography variant='h3'>
        Lists
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <List>
        {data.lists.map((l) => <ListLink key={l.id} {...l} onDelete={handleChange} />)}
      </List>
    </Grid>
  </Grid>;
}

export default Lists;