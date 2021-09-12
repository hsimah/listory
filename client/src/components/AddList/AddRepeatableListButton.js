// @flow
import type {
  AddRepeatableListButtonMutation,
  AddRepeatableListButtonMutationResponse
} from './__generated__/AddRepeatableListButtonMutation.graphql';

import RepeatableLists from '../../pages/repeatable-lists/RepeatableLists';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';

import graphql from 'babel-plugin-relay/macro';
import * as React from 'react';
import { useMutation } from 'react-relay';
import { useHistory } from 'react-router-dom';

export default function AddRepeatableListButton(): React.Element<typeof React.Fragment> {
  const history = useHistory();
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const [commit, inFlight] = useMutation<AddRepeatableListButtonMutation>(
    graphql`
      mutation AddRepeatableListButtonMutation($name: String!) {
        addRepeatableList(list: {name: $name}) {
          slug
        }
      }`
  );

  return <>
    <IconButton color='inherit' onClick={handleOpen}>
      <AddCircle />
    </IconButton>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id='form-dialog-title'>{'Add list'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {'Add new list to listory'}
        </DialogContentText>
        <TextField
          id='name'
          value={value}
          onChange={(event: SyntheticInputEvent<>): void => setValue(event.target.value)}
          label='Name'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          {'Cancel'}
        </Button>
        <Button color='primary' onClick={() => {
          commit({
            variables: {
              name: value,
            },
            onCompleted(data: AddRepeatableListButtonMutationResponse) {
              handleClose();
              setValue('');
              history.push(`/list/${data.addRepeatableList.slug}`);
            },
          });
        }}>
          {'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}
