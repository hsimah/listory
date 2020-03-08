import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const filter = createFilterOptions();

const GET_LIST_ITEMS = gql`
query ListItems($name: String) {
  listItems(where: { name: $name } ) {
    name
    id
  }
}
`;

const ADD_LIST_ITEM = gql`
mutation AddListItem($name: String!) {
  addListItem(name: $name) {
    name
    id
  }
}
`;

const styles = makeStyles((theme) => ({

}));

function ListItemInput({ onChange }) {
  const classes = styles();
  const { data = { listItems: [] }, error, loading } = useQuery(GET_LIST_ITEMS);
  const [addListItem] = useMutation(
    ADD_LIST_ITEM, {
    update(
      cache,
      { data: { addListItem } }) {
      const { listItems } = cache.readQuery({ query: GET_LIST_ITEMS });
      cache.writeQuery({
        query: GET_LIST_ITEMS,
        data: { listItems: listItems.concat([addListItem]) },
      });
    },
    onCompleted: (data) => {
      setValue(null);
    },
  });

  const [value, setValue] = React.useState(null);

  return <Autocomplete
      value={value}
      onChange={(event, newValue) => {
      if (typeof newValue === 'string') {
        setTimeout(() => {
        });
        return;
      }

      if (newValue && newValue.inputValue) {

        return;
      }

      setValue(newValue);
    }}
      filterOptions={(options, params) => {
      const filtered = filter(options, params);

      if (params.inputValue !== '') {
        filtered.push({
          inputValue: params.inputValue,
          name: `Add "${params.inputValue}"`,
        });
      }

      return filtered;
    }}
      options={data.listItems}
      getOptionLabel={(option) => {
      // e.g value selected with enter, right from the input
      if (typeof option === 'string') {
        return option;
      }
      if (option.inputValue) {
        return option.inputValue;
      }
      return option.name;
    }}
      renderOption={(option) => option.name}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) =>
      <TextField {...params} label='Free solo dialog' variant='outlined' />
    }
  />;
}

export default ListItemInput;