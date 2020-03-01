const { gql } = require('apollo-server-express');
const list = require('./modules/list/graphqlSchema');
const listItem = require('./modules/list-item/graphqlSchema');

const root = gql`
  type Query {root:String}
  type Mutation {root:String}
`;

module.exports = [root, list, listItem];
