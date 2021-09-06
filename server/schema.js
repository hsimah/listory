// const ListSchemaFactory = require('./modules/list/schema');
// const ListItemSchemaFactory = require('./modules/list-item/schema');
const RepeatableListSchemaFactory = require('./modules/repeatable-list/repeatable-list-schema');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const merge = require('lodash.merge');

const {Enums, Interfaces} = require('./types/list');

// const { typeDefs: List, resolvers: listResolvers } = ListSchemaFactory();
// const { typeDefs: ListItem, resolvers: listItemResolvers } = ListItemSchemaFactory();
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
  typeDefs: [Root, Enums, Interfaces, RepeatableList],
  resolvers: merge(repeatableListItemResolvers),
});