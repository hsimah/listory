import gql from 'graphql-tag';

const LIST = gql`
fragment ListDetails on List {
  id
  name
  slug
  type
  archived
}
`;

const LIST_WITH_ITEMS = gql`
fragment ListDetailsItems on List {
  listItems {
    id
    name
    slug
  }
}`;

const LIST_ITEM = gql`
fragment ListItemDetails on ListItem {
  id
  name
  slug
}
`;

export default {
  LIST,
  LIST_WITH_ITEMS,
  LIST_ITEM,
};