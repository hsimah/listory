import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import AddCircle from '@material-ui/icons/AddCircle';
import React from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import RepeatableLists from '../../pages/repeatable-lists/RepeatableLists';
import gql from 'graphql-tag';

export default function AddRepeatableListButton() {
  const history = useHistory();
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addList] = useMutation(
    AddRepeatableListButton.mutations.ADD_REPEATABLE_LIST,
    {
      update(
        cache,
        { data: { addRepeatableList } }) {
        const { lists } = cache.readQuery({ query: RepeatableLists.queries.GET_REPEATABLE_LISTS });
        cache.writeQuery({
          query: RepeatableLists.queries.GET_REPEATABLE_LISTS,
          data: { list: lists.concat([addRepeatableList]) },
        });
      },
      onCompleted(data) {
        handleClose();
        setValue('');
        history.push(`/list/${data.addRepeatableList.slug}`);
      },
    });

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
          onChange={(event) => setValue(event.target.value)}
          label='Name'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          {'Cancel'}
        </Button>
        <Button color='primary' onClick={() => {
          addList({
            variables: {
              name: value,
            },
          });
        }}>
          {'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  </>;
}

AddRepeatableListButton.mutations = {
  ADD_REPEATABLE_LIST: gql`
  mutation AddRepeatableList($name: String!) {
    addRepeatableList(list: {name: $name}) {
      ...RepeatableListDetails
    }
  }
  ${RepeatableLists.fragments.REPEATABLE_LIST}
  `,
};