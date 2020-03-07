const { gql } = require('apollo-server-express');

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  type ListItem {
    name: String!
    id: String
    slug: String
  }
  input ListItemWhereArgs {
    name: String
    id: String
    slug: String
  }
  extend type Query {
    listItems(where: ListItemWhereArgs): [ListItem]
    listItem(where: ListItemWhereArgs): ListItem
  }
  extend type Mutation {
    addListItem(name: String!): ListItem!
    updateListItem(name: String!): ListItem!
  }
`;

module.exports = typeDefs;
