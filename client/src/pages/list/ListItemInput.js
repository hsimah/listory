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

  const { data: listData, error: listError, loading: listLoading } = useQuery(GET_LIST, { variables: { slug } });
  const { data: listItemData, error, loading } = useQuery(GET_LIST_ITEMS);

  const listItemIds = React.useMemo(() => {
    return (listData.list.listItems || []).map((l) => l.id);
  }, [listData.list.listItems]);

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
      onCompleted(data) {
        onChange({
          variables: {
            list: {
              slug,
              listItems: [...listItemIds, data.addListItem.id],
            },
          },
        });
      },
    });

  if (listLoading) return null;

  return <Autocomplete
    onChange={(_, newValue) => {
      if (newValue?.id != null) {
        onChange({
          variables: {
            list: {
              slug,
              listItems: [...listItemIds, newValue.id],
            },
          },
        });
      }
      if (newValue?.inputValue) {
        addListItem({
          variables: {
            name: newValue.inputValue,
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
      if (typeof option === 'string') {
        return option;
      }
      if (option.inputValue) {
        return option.inputValue;
      }
      return option.name;
    }}
    renderOption={(option) => option.name}
    freeSolo
    renderInput={(params) =>
      <TextField {...params} label='Add list items' />
    }
  />;
}

export default ListItemInput;