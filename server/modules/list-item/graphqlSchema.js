const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type ListItem {
    name: String!
    id: Int
    slug: String
  }
  input ListItemWhereArgs {
    name: String
    id: Int
    slug: String
  }
  input ListItemInput {
    name: String
    id: Int
    slug: String
  }
  extend type Query {
    listItems(where: ListItemWhereArgs): [ListItem]
    listItem(where: ListItemWhereArgs): ListItem
  }
  extend type Mutation {
    addListItem(name: String!): ListItem!
    updateListItem(listItem: ListItemInput!): ListItem!
  }
`;

module.exports = typeDefs;
