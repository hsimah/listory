const RepeatableListSchemaFactory = require('./modules/repeatable-list/repeatable-list-schema');
const RepeatableListItemSchemaFactory = require('./modules/repeatable-list/repeatable-list-item-schema');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const merge = require('lodash.merge');

const { typeDefs: RepeatableList, resolvers: repeatableListItemResolvers } = RepeatableListSchemaFactory();
const { typeDefs: RepeatableListItem, resolvers: repeatableListItemItemResolvers } = RepeatableListItemSchemaFactory();

const Root = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: [Root, RepeatableListItem, RepeatableList],
  resolvers: merge(repeatableListItemItemResolvers, repeatableListItemResolvers),
});