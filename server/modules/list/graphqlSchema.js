const { gql } = require('apollo-server-express');

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  enum ListType {
    MASTER
    SUB
    TRANSIENT
  }
  type List {
    name: String
    id: String
    type: ListType
    archived: Boolean
  }
  extend type Query {
    lists: [List],
    list(name: String!): ListItem,
  },
  extend type Mutation {
    addList(name: String!, type: ListType!): List!
    updateList(name: String!): List!
  }
`;

module.exports = typeDefs;
