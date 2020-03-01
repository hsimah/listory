const listItem = require('./list-item');

const resolvers = {
  Query: {
    listItems: listItem.get,
    listItem: listItem.getOne,
  },
  Mutation: {
    addListItem: listItem.add,
    updateListItem: listItem.update,
  },
  ListItem: {
    id: (node) => node.$loki,
    name: (node) => node.name,
  },
};

module.exports = resolvers;