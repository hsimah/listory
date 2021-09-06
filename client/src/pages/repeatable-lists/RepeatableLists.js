import { useQuery } from '@apollo/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useMutation } from '@apollo/client';
import ListLink from '../../components/Links/ListLink';
import mutations from '../../data/mutations';
import gql from 'graphql-tag';

export default function RepeatableLists() {
  const { data = { repeatableLists: [] }, loading } = useQuery(RepeatableLists.queries.GET_REPEATABLE_LISTS);

  const [updateList] = useMutation(
    mutations.UPDATE_LIST,
    {
      update(cache, { data: { updateList } }) {
        const { lists } = cache.readQuery({ query: RepeatableLists.queries.GET_REPEATABLE_LISTS });
        cache.writeQuery({
          query: RepeatableLists.queries.GET_REPEATABLE_LISTS,
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
        {'Lists'}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <List>
        {data.repeatableLists.map((l) => <ListLink key={l.id} {...l} onDelete={handleChange} />)}
      </List>
    </Grid>
  </Grid>;
}

RepeatableLists.fragments = {
  REPEATABLE_LIST: gql`
  fragment RepeatableListDetails on RepeatableList {
    id
    name
    slug
    type
    archived
  }
  `,
};

RepeatableLists.queries = {
  GET_REPEATABLE_LISTS: gql`
  query RepeatableLists {
    repeatableLists {
      ...RepeatableListDetails
    }
  }
  ${RepeatableLists.fragments.REPEATABLE_LIST}
  `,
};