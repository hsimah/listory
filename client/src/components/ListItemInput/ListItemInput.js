// @flow
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useLazyLoadQuery, useFragment, useMutation } from 'react-relay';
import type { ListItemInputMutation } from './__generated__/ListItemInputMutation.graphql';
import type {
  ListItemInputQuery,
  ListItemInputQueryResponse
} from './__generated__/ListItemInputQuery.graphql';
import graphql from 'babel-plugin-relay/macro';

const filter = createFilterOptions();

type ListItemType = $ElementType<$NonMaybeType<$PropertyType<$NonMaybeType<$PropertyType<ListItemInputQueryResponse, 'repeatableList'>>, 'listItems'>>, 0>;

export default function ListItemInput(): React.Element<typeof Autocomplete> {
  const { slug } = useParams();
  const data = useLazyLoadQuery < ListItemInputQuery > (graphql`
    query ListItemInputQuery($slug: String!) {
      repeatableList(where: {
        slug: $slug
      }) {
        listItems {
          id
          name
          slug
        }
      }
    }`,
    { slug });

  const [commit, inFlight] = useMutation < ListItemInputMutation > (
    graphql`
      mutation ListItemInputMutation($slug: String!, $item: String!) {
        addListItemToRepeatableList(input: {slug: $slug, item: $item}) {
          listItems {
            id
            name
            slug
          }
        }
      }`);

  const options: $ReadOnlyArray<ListItemType> = data.repeatableList?.listItems ?? [];

  return <Autocomplete
    onChange={(_: SyntheticEvent<>, newValue: { slug: ?string, inputValue: string }) => {
      commit({
        variables: {
          slug,
          item: newValue?.slug != null ? newValue.slug : newValue.inputValue,
        },
      });
    }}
    filterOptions={(options: $ReadOnlyArray<ListItemType>, params: { inputValue: string }): $ReadOnlyArray<ListItemType> => {
      const filtered = filter(options, params);

      if (params.inputValue !== '') {
        filtered.push({
          inputValue: params.inputValue,
          name: `Add "${params.inputValue}"`,
        });
      }

      return filtered;
    }}
    options={options}
    getOptionLabel={(option: string | { inputValue: ?string, name: string }): string => {
      if (typeof option === 'string') {
        return option;
      }
      if (option?.inputValue != null) {
        return option.inputValue;
      }
      return option.name;
    }}
    renderOption={(option: { name: string }): string => option.name}
    freeSolo
    renderInput={(params: React$ElementConfig<typeof TextField>): React.Element<typeof TextField> =>
      <TextField {...params} label='Add list items' />
    }
  />;
}
