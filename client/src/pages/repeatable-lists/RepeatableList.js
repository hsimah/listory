// @flow
import type { RepeatableListItem$key } from './__generated__/RepeatableListItem.graphql';
import type {
  RepeatableListMutation,
  RepeatableListMutationResponse
} from './__generated__/RepeatableListMutation.graphql';
import type { RepeatableListQuery } from './__generated__/RepeatableListQuery.graphql';

import ListItemInput from '../../components/ListItemInput/ListItemInput';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemContainer from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import graphql from 'babel-plugin-relay/macro';
import * as React from 'react';
import { useFragment, useLazyLoadQuery, useMutation } from 'react-relay';
import { useHistory, useParams } from 'react-router-dom';

type PropType = $ReadOnly<{
  fragmentRef: RepeatableListItem$key
}>;
function RepeatableListItem({ fragmentRef }: PropType): React.Element<typeof List> {
  const { slug } = useParams();
  const data = useFragment < RepeatableListItem$key > (graphql`fragment RepeatableListItem on RepeatableListItem {
    id
    name
    slug
  }`, fragmentRef);
  const [commit, inFlight] = useMutation(graphql`
    mutation RepeatableListItemMutation($slug: String!, $item: String!) {
      removeListItemFromRepeatableList(input: {slug: $slug, item: $item}) {
        id
      }
    }`);

  return <ListItemContainer key={data.id}>
    <ListItemAvatar>
      <Avatar>
        <ListIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={data.name} />
    <ListItemSecondaryAction>
      <IconButton edge='end' color='secondary' onClick={() => {
        commit({
          variables: {
            list: {
              slug,
              item: data.slug,
            },
          },
        });
      }}>
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItemContainer>;
}

// eslint-disable-next-line flowtype/no-mixed
const useStyles = makeStyles((theme: { spacing: number => string}): { [string]: mixed } => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: '100%',
  },
}));

export default function RepeatableList(): React.Element<typeof Grid> {
  const { slug } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const data = useLazyLoadQuery < RepeatableListQuery > (
    graphql`query RepeatableListQuery($slug: String!) {
      repeatableList(where: {
        slug: $slug
      }) {
        name
        listItems {
          id
          ...RepeatableListItem
        }
      }
    }`,
    {
      slug,
    });

  const [commit] = useMutation < RepeatableListMutation > (graphql`mutation RepeatableListMutation($slug: String!) {
      addRepetition(where: {slug: $slug}) {
        __typename
      }
    }`);

  return <Grid container justify='center'>
    <Grid item xs={12}>
      <Typography variant='h3'>
        {data.repeatableList?.name}
        <IconButton color='inherit' onClick={() => {
          commit({
            variables: {
              slug,
            },
            onCompleted(data: RepeatableListMutationResponse) {
              history.push(`/${slug}`);
            },
          });
        }}>
          <PowerSettingsNewIcon />
        </IconButton>
      </Typography>
    </Grid>
    <Grid item xs={12} sm={8}>
      <FormControl component='fieldset' className={classes.formControl}>
        <ListItemInput />
      </FormControl>
    </Grid>
    {data.repeatableList?.listItems != null && <Grid item xs={12} sm={8}>
      <List>
        {data.repeatableList.listItems.map((l: $ElementType<
          $NonMaybeType<$ElementType<
            $NonMaybeType<typeof data.repeatableList>, 'listItems'>>,
          0>): ?React.Element<typeof RepeatableListItem> => l?.id != null ?
            <RepeatableListItem fragmentRef={l} /> : null)}
      </List>
    </Grid>}
  </Grid>;
}

