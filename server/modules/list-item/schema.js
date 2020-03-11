const listItem = require('./list-item');

const resolvers = {
  Query: {
    listItems: (_, { where }) => listItem.get(where),
    listItem: (_, { where }) => listItem.getOne(where),
  },
  Mutation: {
    addListItem: (_, item) => listItem.add(item),
    updateListItem: (_, { listItem: item }) => listItem.update(item),
  },
  ListItem: {
    id: (node) => node.$loki,
    name: (node) => node.name,
  },
};

const typeDefs = `
  type ListItem {
    name: String!
    id: Int
    slug: String
  }
  input ListItemWhereArgs {
    name: String
    id: Int
    slug: String
  }
  input ListItemInput {
    name: String
    id: Int
    slug: String
  }
  extend type Query {
    listItems(where: ListItemWhereArgs): [ListItem]
    listItem(where: ListItemWhereArgs): ListItem
  }
  extend type Mutation {
    addListItem(name: String!): ListItem!
    updateListItem(listItem: ListItemInput!): ListItem!
  }
`;

module.exports = {
  resolvers,
  typeDefs,
};
