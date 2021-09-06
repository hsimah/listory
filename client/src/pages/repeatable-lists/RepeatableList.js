import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import ListItemInput from '../../components/ListItemInput/ListItemInput';
import ListItem from '../list/ListItem';
import gql from 'graphql-tag';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

export default function RepeatableList() {
  let { slug } = useParams();
  const classes = useStyles();
  const { data, error, loading } = useQuery(
    RepeatableList.queries.GET_REPEATABLE_LIST,
    {
      variables: {
        slug,
      },
    });

  const [updateList] = useMutation(
    RepeatableList.mutations.UPDATE_REPEATABLE_LIST,
    {
      update(cache, { data: { updateList } }) {
        const { list } = cache.readQuery({ query: RepeatableList.queries.GET_REPEATABLE_LIST, variables: { slug } });
        cache.writeQuery({
          query: RepeatableList.queries.GET_REPEATABLE_LIST,
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
        {data.repeatableList.name}
      </Typography>
    </Grid>
    <Grid item xs={8}>
      <FormControl component='fieldset' className={classes.formControl}>
        <InputLabel>{'Type'}</InputLabel>
        <Select
          id='type'
          name='type'
          value={data.repeatableList.type}
          onChange={handleChange}
        >
          <MenuItem value={'MASTER'} name='type'>{'Master'}</MenuItem>
          <MenuItem value={'SUB'} name='type'>{'Sub'}</MenuItem>
          <MenuItem value={'TRANSIENT'} name='type'>{'Transient'}</MenuItem>
        </Select>
      </FormControl>
      <FormControl component='fieldset' className={classes.formControl}>
        <ListItemInput onChange={updateList} />
      </FormControl>
    </Grid>
    <Grid item xs={8}>
      <ListItem items={data.repeatableList.listItems} onChange={updateList} />
    </Grid>
  </Grid>;
}

RepeatableList.fragments = {
  REPEATABLE_LIST: gql`
  fragment RepeatableListDetails on RepeatableList {
    id
    name
    slug
    archived
  }
  `,
  REPEATABLE_LIST_WITH_ITEMS: gql`
  fragment RepeatableListDetailsItems on RepeatableList {
    listItems {
      id
      name
      slug
    }
  }`,
};

RepeatableList.queries = {
  GET_REPEATABLE_LIST: gql`
  query RepeatableList($slug: String!) {
    repeatableList(where: {
      slug: $slug
    }) {
      ...RepeatableListDetails
    }
  }
  ${RepeatableList.fragments.REPEATABLE_LIST}
  `,
};

RepeatableList.mutations = {
  UPDATE_REPEATABLE_LIST: gql`
  mutation UpdateList($list: UpdateListInput!) {
    updateRepeatableList(list: $list) {
      ...RepeatableListDetails
      ...RepeatableListDetailsItems
    }
  }
  ${RepeatableList.fragments.REPEATABLE_LIST}
  ${RepeatableList.fragments.REPEATABLE_LIST_WITH_ITEMS}
  `,
};