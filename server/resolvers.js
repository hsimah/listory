const {Query: listQuery, Mutation: listMutation, ...list} = require('./modules/list/resolvers');
const {Query: listItemQuery, Mutation: listItemMutation, ...listItem} = require('./modules/list-item/resolvers');

const resolvers = {
  Query: {
    ...listQuery,
    ...listItemQuery,
  },
  Mutation: {
    ...listMutation,
    ...listItemMutation,
  },
  ...list,
  ...listItem,
};
module.exports = resolvers;