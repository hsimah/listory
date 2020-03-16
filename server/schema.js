const ListSchemaFactory = require('./modules/list/schema');
const ListItemSchemaFactory = require('./modules/list-item/schema');
const { makeExecutableSchema } = require('graphql-tools');
const merge = require('lodash.merge');

const { typeDefs: List, resolvers: listResolvers } = ListSchemaFactory();
const { typeDefs: ListItem, resolvers: listItemResolvers } = ListItemSchemaFactory();

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