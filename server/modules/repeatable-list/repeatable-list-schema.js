/**
 * Repeatable List
 * A repeatable list extends the basic list type.
 * 
 * A list is created and assigned list items
 * User triggers creation of an active list
 *  List Items will be cloned as repeated list items into the active list
 *  Users mark items as complete
 *   Once all items are complete the list is completed
 */

const { AuthenticationError } = require('apollo-server-lambda');
const Api = require('../../api');

function RepeatableListSchemaFactory() {
  return {
    resolvers: {
      Query: {
        lists: (_, { where }, { lists, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return lists.get(where);
        },
        list: (_, { where }, { lists, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return lists.getOne(where);
        },
      },
      Mutation: {
        addRepeatableList: (_, item, { lists, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return lists.add(item);
        },
        updateRepeatableList: (_, { item }, { lists, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return lists.update(item);
        },
        deleteListItem: (_, { list: item }, { lists, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return lists.delete(item);
        },
        addRepetition: (_obj, {where}, { lists, repeatedLists, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          const list = lists.getOne(where);

          // complete previous active list
          const lastRepeatedList = repeatedLists.getOne({id: list.activeList});
          lastRepeatedList.completedTime = Date.now();
          repeatedLists.update(lastRepeatedList);

          // create new active list & save
          const repeatedList = repeatedLists.add({
            completed: false,
            listItems: list.listItems != null ? list.listItems : [],
          });
          list.activeList = repeatedList.$loki;
          list.lists = [...list.lists, repeatedList.$loki];
          return lists.update(list);
        },
      },
      RepeatableList: {
        id: (node) => node.$loki,
        type: (node) => node.type,
        name: (node) => node.name,
        archived: (node) => node.archived,
        listItems: (node, _, { listItems, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          if (node.listItems != null) {
            return listItems.get({ id: node.listItems });
          }
          return [];
        },
        slug: (node) => node.slug,
        lists: (node, _, { repeatedLists, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          if (node.lists != null) {
            return repeatedLists.get({ id: node.lists });
          }
          return [];
        },
        activeList: (node, _, { repeatedListItems, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          return repeatedListItems.getOne({id: node.activeList});
        },
      },
      RepeatableListItem: {
        id: (node) => node.$loki,
        name: (node) => node.name,
        slug: (node) => node.slug,
      },
      RepeatedList: {
        id: (node) => node.$loki,
        listItems: (node, _, { repeatedListItems, user }) => {
          if (user.isValid !== true) {
            throw new AuthenticationError('Invalid access token');
          }
          if (node.listItems != null) {
            return repeatedListItems.get({ id: node.listItems });
          }
          return [];
        },
        completedTime: (node) => node.completedTime,
        completed: (node) => node.completedTime != null,
      },
      RepeatedListItem: {
        id: (node) => node.$loki,
        name: (node) => node.name,
        slug: (node) => node.slug,
        completedTime: (node) => node.completedTime,
        completed: (node) => node.completedTime != null,
      },
    },
    typeDefs: `
    type RepeatableList {
      id: ID!
      name: String!
      type: ListType
      archived: Boolean
      listItems: [ListItem]
      slug: String!
      activeList: RepeatedList
      lists: [RepeatedList!]
    }
    type RepeatableListItem {
      name: String!
      id: Int
      slug: String
    }
    type RepeatedList {
      id: ID!
      completedTime: Int
      completed: Boolean!
      listItems: [RepeatedListItem!]
    }
    type RepeatedListItem {
      name: String!
      id: Int
      slug: String
      completedTime: Int
      completed: Boolean!
    }
    extend type Query {
      repeatableLists(where: ListWhereArgs): [RepeatableList!]
      repeatableList(where: ListWhereArgs): RepeatableList
    }
    extend type Mutation {
      addList(name: String!): List!
      updateList(list: ListUpdateInput!): List!
      deleteList(list: ID!): List!
    }
   `,
  };
}

module.exports = RepeatableListSchemaFactory;