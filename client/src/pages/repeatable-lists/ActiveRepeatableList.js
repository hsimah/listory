// @flow
import type { ActiveRepeatableListItem$key } from './__generated__/ActiveRepeatableListItem.graphql';
import type { ActiveRepeatableListQuery } from './__generated__/ActiveRepeatableListQuery.graphql';

import ListItemInput from '../../components/ListItemInput/ListItemInput';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ListIcon from '@material-ui/icons/List';
import graphql from 'babel-plugin-relay/macro';

import SwipeableListItem from 'mui-swipeable-list-item';
import * as React from 'react';
import {
  useFragment,
  useLazyLoadQuery,
  useMutation
} from 'react-relay';
import { useParams } from 'react-router-dom';

function ActiveRepeatableListItem({ fragmentRef }: $ReadOnly<{ fragmentRef: ActiveRepeatableListItem$key }>): React.Element<typeof SwipeableListItem> {
  const data = useFragment(graphql`
  fragment ActiveRepeatableListItem on RepeatedListItem {
    name
    slug
    completed
  }
  `, fragmentRef);
  const [completeListItem] = useMutation(graphql`
  mutation ActiveRepeatableListItemMutation($where: CompleteRepeatedListItemMutationInput!) {
    completeRepeatedListItem(where: $where) {
      ...ActiveRepeatableListItem
    }
  }`);
  const { slug } = useParams();

  return <SwipeableListItem
    key={data.slug}
    avatar={
      <Avatar>
        <ListIcon />
      </Avatar>
    }
    background={{
      actionIconLeft: <AssignmentTurnedInIcon />,
      backgroundColorLeft: 'green',
    }}
    onSwipedLeft={() => {
      completeListItem({
        variables: {
          where: {
            slug,
            item: data.slug,
          },
        },
      });
    }}
    primaryText={data.name}
  />;
}

// eslint-disable-next-line flowtype/no-mixed
const useStyles = makeStyles((theme: { spacing: number=> void}): { [string]: mixed } => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: '100%',
  },
}));

export default function ActiveRepeatableList(): React.Element<typeof Grid> {
  const { slug } = useParams();
  const classes = useStyles();
  const data = useLazyLoadQuery < ActiveRepeatableListQuery > (
    graphql`query ActiveRepeatableListQuery($slug: String!) {
      repeatableList(where: {
        slug: $slug
      }) {
        name
        activeList {
          listItems {
            ...ActiveRepeatableListItem
          }
        }
      }
    }`,
    { slug });

  return <Grid container justify='center'>
    <Grid item xs={6} sm={8}>
      <Typography variant='h3'>
        {data.repeatableList?.name}
      </Typography>
    </Grid>
    <Grid item xs={6} sm={8}>
      <FormControl component='fieldset' className={classes.formControl}>
        <ListItemInput />
      </FormControl>
    </Grid>
    <Grid item xs={6} sm={8}>
      <List>
        {data?.repeatableList?.activeList?.listItems?.map((l: $PropertyType<React$ElementConfig<typeof ActiveRepeatableListItem>, 'fragmentRef'>): React.Element<typeof ActiveRepeatableListItem> =>
          <ActiveRepeatableListItem fragmentRef={l} />
        )}
      </List>
    </Grid>
  </Grid>;
}
