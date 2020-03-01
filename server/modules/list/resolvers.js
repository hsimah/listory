const list = require('./list');

const resolvers = {
  Query: {
    lists: () => list.get(),
    list: () => list.getOne(),
  },
  Mutation: {
    addList: (_, item) => list.add(item),
    updateList: (_, item) => list.update(item),
  },
  List: {
    id: (node) => node.$loki,
    type: (node) => node.type,
    name: (node) => node.name,
    archived: (node) => node.archived,
  },
};

module.exports = resolvers;