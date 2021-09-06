const RepeatableListSchemaFactory = require('./modules/repeatable-list/repeatable-list-schema');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const merge = require('lodash.merge');

const { typeDefs: RepeatableList, resolvers: repeatableListItemResolvers } = RepeatableListSchemaFactory();

const Root = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [Root, RepeatableList],
  resolvers: merge(repeatableListItemResolvers),
});