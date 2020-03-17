const { AuthenticationError } = require('apollo-server-lambda');
const Api = require('../../api');

function ListItemSchemaFactory() {
  const listItem = new Api({
    name: 'list-item',
  });

  return {
    resolvers: {
      Query: {
        listItems: (_, { where }, { database, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return listItem.get(database, where);
        },
        listItem: (_, { where }, { database, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return listItem.getOne(database, where);
        },
      },
      Mutation: {
        addListItem: (_, item, { database, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return listItem.add(database, item);
        },
        updateListItem: (_, { listItem: item }, { database, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return listItem.update(database, item);
        },
        deleteListItem: (_, { list: item }, { database, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return listItem.delete(database, item);
        },
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
        deleteListItem(listItem: ListItemInput!): ListItem!
      }
    `,
  };
}



module.exports = ListItemSchemaFactory;
