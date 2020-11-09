import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import queries from '../../data/queries';
import mutations from '../../data/mutations';

const filter = createFilterOptions();

function ListItemInput({ onChange }) {
  const { slug } = useParams();

  const { data: listData, loading: listLoading } = useQuery(queries.GET_LIST, { variables: { slug } });
  const { data: listItemData } = useQuery(queries.GET_LIST_ITEMS);

  const listItemIds = React.useMemo(() => {
    return (listData.list.listItems || []).map((l) => l.id);
  }, [listData.list.listItems]);

  const [addListItem] = useMutation(
    mutations.ADD_LIST_ITEM,
    {
      update(
        cache,
        { data: { addListItem } }) {
        const { listItems } = cache.readQuery({ query: queries.GET_LIST_ITEMS });
        cache.writeQuery({
          query: queries.GET_LIST_ITEMS,
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