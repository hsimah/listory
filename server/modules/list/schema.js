const Api = require('../../api');

function ListSchemaFactory(db) {
  const list = new Api({
    db,
    name: 'list',
  });
  const listItems = new Api({
    db,
    name: 'list-item',
  });

  return {
    resolvers: {
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