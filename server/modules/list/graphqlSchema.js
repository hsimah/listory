const { gql } = require('apollo-server-express');

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
    slug: String!,
    type: ListType
    archived: Boolean
    listItems: [Int]
  }
  input ListWhereArgs {
    id: Int
    name: String
    slug: String
  }
  extend type Query {
    lists(where: ListWhereArgs): [List],
    list(where: ListWhereArgs): List,
  },
  extend type Mutation {
    addList(name: String!): List!
    updateList(list: ListInput!): List!
  }
`;

module.exports = typeDefs;
