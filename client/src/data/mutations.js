import gql from 'graphql-tag';
import fragments from './fragments';

const ADD_LIST = gql`
mutation AddList($name: String!) {
  addList(name: $name) {
    ...ListDetails
  }
}
${fragments.LIST}
`;

const UPDATE_LIST = gql`
mutation UpdateList($list: ListInput!) {
  updateList(list: $list) {
    ...ListDetails
    ...ListDetailsItems
  }
}
${fragments.LIST}
${fragments.LIST_WITH_ITEMS}
`;

const ADD_LIST_ITEM = gql`
mutation AddListItem($name: String!) {
  addListItem(name: $name) {
    ...ListItemDetails
  }
}
${fragments.LIST_ITEM}
`;

const UPDATE_LIST_ITEM = gql`
mutation UpdateListItem($listItem: ListItemInput!) {
  updateListItem(listItem: $listItem) {
    ...ListItemDetails
  }
}
${fragments.LIST_ITEM}
`;

const DELETE_LIST = gql`
mutation DeleteList($list: ListInput!) {
  deleteList(list: $list) {
    ...ListDetails
  }
}
${fragments.LIST}
`;

export default {
  ADD_LIST,
  UPDATE_LIST,
  DELETE_LIST,
  ADD_LIST_ITEM,
  UPDATE_LIST_ITEM,
};