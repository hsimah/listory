const { gql } = require('apollo-server-express');

// Construct a schema using GraphQL schema language
const typeDefs = gql`
  enum ListType {
    MASTER
    SUB
    TRANSIENT
  }
  type List {
    name: String!
    id: Int!
    type: ListType
    archived: Boolean
    listItems: [ListItem]
    slug: String!
  }
  input ListInput {
    id: Int
    type: ListType
    archived: Boolean
    listItems: [String]
  }
  input ListWhereArgs {
    id: Int
    name: String
    slug: String
  }
  extend type Query {
    lists(where: ListWhereArgs): [List],
    list(where: ListWhereArgs): ListItem,
  },
  extend type Mutation {
    addList(name: String!): List!
    updateList(list: ListInput): List!
  }
`;

module.exports = typeDefs;
