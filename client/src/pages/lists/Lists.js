import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useMutation } from 'react-apollo';
import ListLink from '../../components/Links/ListLink';
import queries from '../../data/queries';
import mutations from '../../data/mutations';

function Lists() {
  const { data = { lists: [] }, loading } = useQuery(queries.GET_LISTS);

  const [updateList] = useMutation(
    mutations.UPDATE_LIST,
    {
      update(cache, { data: { updateList } }) {
        const { lists } = cache.readQuery({ query: queries.GET_LISTS });
        cache.writeQuery({
          query: queries.GET_LISTS,
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