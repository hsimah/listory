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
import ListItemInput from './ListItemInput';
import ListItem from './ListItem';

const UPDATE_LIST = gql`
mutation UpdateList($list: ListInput) {
  updateList(list: $list) {
    id
    name
    type
    slug
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
  }
}
`;

const GET_LISTS = gql`
query Lists {
  lists {
    name
    type
    id
    slug
    listItems
  }
}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

const defaultData = {
  list: {
    listItems: [],
  },
};

function List() {
  let { slug } = useParams();
  const classes = useStyles();
  const { data = defaultData, error, loading } = useQuery(GET_LIST,
    {
      variables: {
        slug,
      },
    });
  const [
    updateList,
    {
      loading: mutationLoading,
      error: mutationError,
    },
  ] = useMutation(UPDATE_LIST, {
    update(cache, { data: { addList } }) {
      const { lists } = cache.readQuery({ query: GET_LISTS });
      cache.writeQuery({
        query: GET_LISTS,
        data: { lists: lists.concat([addList]) },
      });
    },
  });

  const handleChange = (e) => {
    const entity = Object.assign({}, data.list, e.target.value);
    updateList({
      variables: {
        where: entity,
      },
    });
  };

  if (loading) return null;

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
      <ListItemInput value={data.list.listItems} onChange={handleChange} />
    </Grid>
    <Grid item xs={8}>
      <ListItem />
    </Grid>
  </Grid>;
}



export default List;