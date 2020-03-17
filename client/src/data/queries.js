import gql from 'graphql-tag';
import fragments from './fragments';

const GET_LIST = gql`
query List($slug: String!) {
  list(where: {
    slug: $slug
  }) {
    ...ListDetails
    ...ListDetailsItems
  }
}
${fragments.LIST}
${fragments.LIST_WITH_ITEMS}
`;

const GET_LISTS = gql`
query Lists {
  lists {
    ...ListDetails
  }
}
${fragments.LIST}
`;

const GET_LIST_ITEM = gql`
query ListItem($slug: String!) {
  listItem(where: {
    slug: $slug
  }) {
    ...ListItemDetails
  }
}
${fragments.LIST_ITEM}
`;

const GET_LIST_ITEMS = gql`
query ListItems {
  listItems {
    ...ListItemDetails
  }
}
${fragments.LIST_ITEM}
`;

export default {
  GET_LIST,
  GET_LISTS,
  GET_LIST_ITEM,
  GET_LIST_ITEMS,
};