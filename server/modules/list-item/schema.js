const Api = require('../../api');

function ListItemSchemaFactory(db) {
  const listItem = new Api({
    db,
    name: 'list-item',
  });

  return {
    resolvers: {
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
    },
    typeDefs: `
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
    `,
  };
}



module.exports = ListItemSchemaFactory;
