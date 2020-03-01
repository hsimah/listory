const listItem = require('./list-item');

const resolvers = {
  Query: {
    listItems: () => listItem.get(),
    listItem: () => listItem.getOne(),
  },
  Mutation: {
    addListItem: (_, item) => listItem.add(item),
    updateListItem: (_, item) => listItem.update(item),
  },
  ListItem: {
    id: (node) => node.$loki,
    name: (node) => node.name,
  },
};

module.exports = resolvers;