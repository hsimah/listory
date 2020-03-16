const { AuthenticationError } = require('apollo-server-lambda');
const Api = require('../../api');

function ListSchemaFactory() {
  const list = new Api({
    name: 'list',
  });
  const listItems = new Api({
    name: 'list-item',
  });

  return {
    resolvers: {
      Query: {
        lists: (_, { where }, { database, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return list.get(database, where);
        },
        list: (_, { where }, { database, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return list.getOne(database, where);
        },
      },
      Mutation: {
        addList: (_, item, { database, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return list.add(database, item);
        },
        updateList: (_, { list: item }, { database, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return list.update(database, item);
        },
      },
      List: {
        id: (node) => node.$loki,
        type: (node) => node.type,
        name: (node) => node.name,
        archived: (node) => node.archived,
        listItems: (node, _, {database, user}) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          if (node.listItems != null) {
            return listItems.get(database, { id: node.listItems });
          }
          return [];
        },
        slug: (node) => node.slug,
      },
    },
    typeDefs: `
    enum ListType {
      MASTER
      SUB
      TRANSIENT
    }
    type List {
      name: String!
      id: Int!
      type: ListType
      archived: Boolean
      listItems: [ListItem]
      slug: String!
    }
    input ListInput {
      id: Int
      slug: String!,
      type: ListType
      archived: Boolean
      listItems: [Int]
    }
    input ListWhereArgs {
      id: Int
      name: String
      slug: String
    }
    extend type Query {
      lists(where: ListWhereArgs): [List],
      list(where: ListWhereArgs): List,
    },
    extend type Mutation {
      addList(name: String!): List!
      updateList(list: ListInput!): List!
    }
  `,
  };
}


module.exports = ListSchemaFactory;