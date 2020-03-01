const { gql } = require('apollo-server-express');

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  type ListItem {
    name: String
    id: String
  }
  extend type Query {
    listItems: [ListItem]
    listItem(name: String!): ListItem
  }
  extend type Mutation {
    addListItem(name: String!): ListItem!
    updateListItem(name: String!): ListItem!
  }
`;

module.exports = typeDefs;
