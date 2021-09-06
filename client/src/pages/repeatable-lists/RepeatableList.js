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
    width: '100%',
  },
}));

export default function RepeatableList() {
  const { slug } = useParams();
  const classes = useStyles();
  const { data, error, loading } = useQuery(
    RepeatableList.queries.GET_REPEATABLE_LIST,
    {
      variables: {
        slug,
      },
    });

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
        <ListItemInput />
      </FormControl>
    </Grid>
    <Grid item xs={8}>
      <ListItem />
    </Grid>
  </Grid>;
}

RepeatableList.fragments = {
  REPEATABLE_LIST: gql`
  fragment RepeatableList_Details on RepeatableList {
    id
    name
    slug
    archived
    ...ListItem_Details
  }
  ${ListItem.fragments.REPEATABLE_LIST_ITEMS}
  `,
};

RepeatableList.queries = {
  GET_REPEATABLE_LIST: gql`
  query RepeatableList($slug: String!) {
    repeatableList(where: {
      slug: $slug
    }) {
      ...RepeatableList_Details
    }
  }
  ${RepeatableList.fragments.REPEATABLE_LIST}
  `,
};
