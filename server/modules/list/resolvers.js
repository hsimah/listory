const list = require('./list');

const resolvers = {
  Query: {
    lists: (_, { where }) => list.get(where),
    list: (_, { where }) => list.getOne(where),
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
    listItems: (node) => node.listItems || [],
    slug: (node) => node.slug,
  },
};

module.exports = resolvers;