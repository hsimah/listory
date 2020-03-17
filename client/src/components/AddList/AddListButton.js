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
import { useMutation } from 'react-apollo';
import { useHistory } from 'react-router-dom';
import queries from '../../data/queries';
import mutations from '../../data/mutations';

function AddListButton() {
  const history = useHistory();
  const [value, setValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [addList] = useMutation(
    mutations.ADD_LIST,
    {
      update(
        cache,
        { data: { addList } }) {
        const { lists } = cache.readQuery({ query: queries.GET_LISTS });
        cache.writeQuery({
          query: queries.GET_LISTS,
          data: { list: lists.concat([addList]) },
        });
      },
      onCompleted(data) {
        handleClose();
        setValue('');
        history.push(`/list/${data.addList.slug}`);
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

export default AddListButton;