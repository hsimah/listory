const list = require('./list');
const listItems = require('../list-item/list-item');

const resolvers = {
  Query: {
    lists: (_, { where }) => list.get(where),
    list: (_, { where }) => list.getOne(where),
  },
  Mutation: {
    addList: (_, item) => list.add(item),
    updateList: (_, { list: item }) => list.update(item),
  },
  List: {
    id: (node) => node.$loki,
    type: (node) => node.type,
    name: (node) => node.name,
    archived: (node) => node.archived,
    listItems: (node) => {
      if (node.listItems != null) {
        return listItems.get({ id: node.listItems });
      }
      return [];
    },
    slug: (node) => node.slug,
  },
};

module.exports = resolvers;