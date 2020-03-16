import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

const UPDATE_LIST = gql`
mutation UpdateList($listItem: ListItemInput!) {
  updateListItem(listItem: $listItem) {
    id
    name
    slug
  }
}
`;

const GET_LIST_ITEM = gql`
query ListItem($slug: String!) {
  listItem(where: {
    slug: $slug
  }) {
    id
    name
    slug
  }
}
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function ListItem() {
  let { slug } = useParams();
  const classes = useStyles();
  const { data, error, loading } = useQuery(
    GET_LIST_ITEM,
    {
      variables: {
        slug,
      },
    });

  const [updateListItem] = useMutation(
    UPDATE_LIST,
    {
      update(cache, { data: { updateListItem } }) {
        const { list: listItem } = cache.readQuery({ query: GET_LIST_ITEM, variables: { slug } });
        cache.writeQuery({
          query: GET_LIST_ITEM,
          data: { listItem: Object.assign({}, listItem, updateListItem) },
        });
      },
    });

  const handleChange = ({ target: { name, value } }) => {
    const listItem = {
      slug,
      [name]: value,
    };
    updateListItem({
      variables: {
        listItem,
      },
    });
  };

  if (loading) return null;
  if (error != null) return null;

  return <Grid container justify='center'>
    <Grid item xs={8}>
      <Typography variant='h3'>
        {data.listItem.name}
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <FormControl component='fieldset' className={classes.formControl}>
        <TextField disabled required onChange={handleChange} name='name' label='Name' value={data.listItem.name} />
      </FormControl>
      <FormControl component='fieldset' className={classes.formControl}>
        <TextField disabled required onChange={handleChange} name='slug' label='Slug' value={data.listItem.slug} />
      </FormControl>
    </Grid>
  </Grid>;
}

export default ListItem;