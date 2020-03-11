const { typeDefs: List, resolvers: listResolvers } = require('./modules/list/schema');
const { typeDefs: ListItem, resolvers: listItemResolvers } = require('./modules/list-item/schema');
const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash.merge');

const Root = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [Root, List, ListItem],
  resolvers: merge(listResolvers, listItemResolvers),
});