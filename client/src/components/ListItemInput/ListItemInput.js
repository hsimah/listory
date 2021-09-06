import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import gql from 'graphql-tag';

const filter = createFilterOptions();

export default function ListItemInput({ onChange }) {
  const { slug } = useParams();

  const { data, loading } = useQuery(ListItemInput.queries.GET_LIST, { variables: { slug } });

  const listItemIds = React.useMemo(() => {
    return (data?.repeatableList?.listItems ?? []).map((l) => l.id);
  }, [data?.repeatableList?.listItems]);

  const [addListItem] = useMutation(
    ListItemInput.mutations.ADD_LIST_ITEM,
    {
      update(
        cache,
        { data: { upsertRepeatableListItem } }) {
        const { listItems } = cache.readQuery({ query: ListItemInput.queries.GET_LIST });
        cache.writeQuery({
          query: ListItemInput.queries.GET_LIST,
          data: { listItems: [...listItems, upsertRepeatableListItem] },
        });
      },
      onCompleted(data) {
        onChange({
          variables: {
            list: {
              slug,
              listItems: [...listItemIds, data.upsertRepeatableListItem.id],
            },
          },
        });
      },
    });

  if (loading) return null;

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
    options={data?.repeatableList?.listItems ?? []}
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

ListItemInput.fragments = {
  LIST_ITEM: gql`
  fragment ListItemInput_Details on RepeatableListItem {
    id
    name
    slug
  }
  `,
};

ListItemInput.mutations = {
  ADD_LIST_ITEM: gql`
  mutation AddRepeatableListItem($slug: String!, $item: String!) {
    addListItemToRepeatableList(input: {slug: $slug, item: $item}) {
      ...ListItemInput_Details
    }
  }
  ${ListItemInput.fragments.LIST_ITEM}
  `,
};

ListItemInput.queries = {
  GET_LIST: gql`
  query RepeatableListItems($slug: String!) {
    repeatableList(where: {
      slug: $slug
    }) {
      listItems {
        ...ListItemInput_Details
      }
    }
  }
  ${ListItemInput.fragments.LIST_ITEM}
  `,
};