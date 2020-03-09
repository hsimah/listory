import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import gql from 'graphql-tag';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';

const filter = createFilterOptions();

const GET_LIST_ITEMS = gql`
query ListItems($name: String) {
  listItems(where: { name: $name } ) {
    name
    id
  }
}
`;

const GET_LIST = gql`
query List($slug: String) {
  list(where: {
    slug: $slug
  }) {
    id
    listItems {
      id
    }
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
  let { slug } = useParams();
  const classes = styles();

  const [value, setValue] = React.useState(null);
  const { data: listData, error: listError, loading: listLoading } = useQuery(GET_LIST, { variables: { slug } });
  const { data: listItemData, error, loading } = useQuery(GET_LIST_ITEMS);

  const [addListItem] = useMutation(
    ADD_LIST_ITEM,
    {
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



  if (listLoading) return null;


  return <Autocomplete
    value={value}
    onChange={(_, newValue) => {
      if (newValue.id != null) {
        const ids = (listData.list.listItems || []).map((l) => l.id);
        onChange({
          variables: {
            list: {
              slug,
              listItems: [...ids, newValue.id],
            },
          },
          onCompleted: (data) => {
            setValue(null);
          },
        });
      }
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
    options={listItemData?.listItems ?? []}
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