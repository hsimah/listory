import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';
import ListItem from './ListItem';
import ListItemInput from './ListItemInput';

const UPDATE_LIST = gql`
mutation UpdateList($list: ListInput!) {
  updateList(list: $list) {
    id
    name
    type
    slug
    listItems {
      id
      name
    }
  }
}
`;

const GET_LIST = gql`
query List($slug: String!) {
  list(where: {
    slug: $slug
  }) {
    id
    name
    slug
    type
    listItems {
      id
      name
    }
  }
}
`;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function List() {
  let { slug } = useParams();
  const classes = useStyles();
  const { data, error, loading } = useQuery(
    GET_LIST,
    {
      variables: {
        slug,
      },
    });

  const [updateList] = useMutation(
    UPDATE_LIST,
    {
      update(cache, { data: { updateList } }) {
        const { list } = cache.readQuery({ query: GET_LIST, variables: { slug } });
        cache.writeQuery({
          query: GET_LIST,
          data: { list: Object.assign({}, list, updateList) },
        });
      },
    });

  const handleChange = ({ target: { name, value } }) => {
    const list = {
      slug,
      [name]: value,
    };
    updateList({
      variables: {
        list,
      },
    });
  };

  if (loading) return null;
  if (error != null) return null;

  return <Grid container justify='center'>
    <Grid item xs={8}>
      <Typography variant='h3'>
        {data.list.name}
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <FormControl component='fieldset' className={classes.formControl}>
        <InputLabel>{'Type'}</InputLabel>
        <Select
          id='type'
          name='type'
          value={data.list.type}
          onChange={handleChange}
        >
          <MenuItem value={'MASTER'} name='type'>Master</MenuItem>
          <MenuItem value={'SUB'} name='type'>Sub</MenuItem>
          <MenuItem value={'TRANSIENT'} name='type'>Transient</MenuItem>
        </Select>
      </FormControl>
      <FormControl component='fieldset' className={classes.formControl}>
        <ListItemInput onChange={updateList} />
      </FormControl>
    </Grid>
    <Grid item xs={8}>
      <ListItem items={data.list.listItems} onChange={updateList} />
    </Grid>
  </Grid>;
}



export default List;