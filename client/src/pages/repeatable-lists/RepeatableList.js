import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useQuery ,useMutation} from '@apollo/client';
import { useParams } from 'react-router-dom';
import ListItemInput from '../../components/ListItemInput/ListItemInput';
import gql from 'graphql-tag';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemContainer from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';

function RepeatableListView() {
  const { slug } = useParams();
  const { data, loading } = useQuery(RepeatableListView.queries.GET_LIST, { variables: { slug } });

  const [removeListItem] = useMutation(
    RepeatableListView.mutations.REMOVE_LIST_ITEM,
    {
      update(
        cache,
        { data: { upsertRepeatableListItem } }) {
        const { listItems } = cache.readQuery({ query: RepeatableListView.queries.GET_LIST, variables: { slug } });
        cache.writeQuery({
          query: RepeatableListView.queries.GET_LIST,
          data: { listItems: upsertRepeatableListItem.listItems },
        });
      },
    });

  if (loading) return null;

  return <List>
    {data?.repeatableList?.listItems?.map((l) =>
      <ListItemContainer key={l.id}>
        <ListItemAvatar>
          <Avatar>
            <ListIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={l.name} />
        <ListItemSecondaryAction>
          <IconButton edge='end' color='secondary' onClick={() => {
            removeListItem({
              variables: {
                list: {
                  slug,
                  item: l.slug,
                },
              },
            });
          }}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemContainer>
    )}
  </List>;
}

RepeatableListView.fragments = {
  REPEATABLE_LIST_ITEMS: gql`
  fragment RepeatableListView_Details on RepeatableList {
    listItems {
      id
      name
      slug
    }
  }
  `,
};

RepeatableListView.mutations = {
  REMOVE_LIST_ITEM: gql`
  mutation RepeatableListView_RemoveListItemToRepeatableList($slug: String!, $item: String!) {
    removeListItemToRepeatableList(input: {slug: $slug, item: $item}) {
      ...RepeatableListView_Details
    }
  }
  ${RepeatableListView.fragments.REPEATABLE_LIST_ITEMS}
  `,
};

RepeatableListView.queries = {
  GET_LIST: gql`
  query RepeatableListView_RepeatableList($slug: String!) {
    repeatableList(where: {
      slug: $slug
    }) {
      ...RepeatableListView_Details
    }
  }
  ${RepeatableListView.fragments.REPEATABLE_LIST_ITEMS}
  `,
};

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
      <RepeatableListView />
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
    ...RepeatableListView_Details
  }
  ${RepeatableListView.fragments.REPEATABLE_LIST_ITEMS}
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
