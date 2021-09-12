// @flow
import type { RepeatableListsQuery } from './__generated__/RepeatableListsQuery.graphql';

import ListLink from '../../components/Links/ListLink';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import graphql from 'babel-plugin-relay/macro';

import * as React from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';

export default function RepeatableLists(): React.Element<typeof Grid> {
  const data = useLazyLoadQuery < RepeatableListsQuery > (graphql`
    query RepeatableListsQuery {
      repeatableLists {
        id
        ...ListLink
      }
    }`,
    {});

  return <Grid container>
    <Grid item>
      <Typography variant='h3'>
        {'Lists'}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <List>
        {data.repeatableLists?.map((l: $ElementType<$NonMaybeType<typeof data.repeatableLists>, 0>): React.Element<typeof ListLink> => <ListLink key={l.id} fragmentRef={l} />)}
      </List>
    </Grid>
  </Grid>;
}
