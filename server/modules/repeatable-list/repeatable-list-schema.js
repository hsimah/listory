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

function RepeatableListSchemaFactory() {
  return {
    resolvers: {
      Query: {
        repeatableLists: (_, { where }, { repeatableLists }) => {
          return repeatableLists.get(where);
        },
        repeatableList: (_, { where }, { repeatableLists }) => {
          return repeatableLists.getOne(where);
        },
      },
      Mutation: {
        addRepeatableList: (_, { list }, { repeatableLists }) => {
          if (list.listItems == null) {
            list.listItems = [];
          }
          return repeatableLists.add(list);
        },
        updateRepeatableList: (_, { list }, { repeatableLists }) => {
          return repeatableLists.update(list);
        },
        deleteRepeatableList: (_, { id }, { repeatableLists }) => {
          return repeatableLists.delete({ id });
        },
        addRepetition: (_, { where }, { repeatableLists, repeatedLists }) => {
          const list = repeatableLists.getOne(where);

          // complete previous active list
          const lastRepeatedList = repeatedLists.getOne({ id: list.activeList });
          lastRepeatedList.completedTime = Date.now();
          repeatedLists.update(lastRepeatedList);

          // create new active list & save
          const repeatedList = repeatedLists.add({
            completed: false,
            listItems: list.listItems != null ? list.listItems : [],
          });
          list.activeList = repeatedList.$loki;
          list.lists = [...list.lists, repeatedList.$loki];
          return repeatableLists.update(list);
        },
        addListItemToRepeatableList: (_, { input }, { repeatableLists, repeatableListItems }) => {
          const list = repeatableLists.getOne({ slug: input.slug });
          // if item exists find via slug, otherwise create with name
          let listItem = repeatableListItems.getOne({ slug: input.item });
          if (listItem == null) {
            listItem = repeatableListItems.add({ name: input.item });
          }
          list.listItems = [...list.listItems || [], listItem.$loki];
          return repeatableLists.update(list);
        },
        removeListItemToRepeatableList: (_, { input }, { repeatableLists, repeatableListItems }) => {
          const list = repeatableLists.getOne({ slug: input.slug });
          // if item exists remove it from the list
          let listItem = repeatableListItems.getOne({ slug: input.item });
          if (listItem == null) {
            return list;
          }
          list.listItems = list.listItems.filter((i) => i.$loki === listItem.$loki);
          return repeatableLists.update(list);
        },
      },
      RepeatableList: {
        id: (node) => node.$loki,
        name: (node) => node.name,
        archived: (node) => node.archived,
        listItems: (node, _, { repeatableListItems }) => {
          if (node.listItems != null) {
            return repeatableListItems.get({ id: node.listItems });
          }
          return [];
        },
        slug: (node) => node.slug,
        lists: (node, _, { repeatedLists }) => {
          if (node.lists != null) {
            return repeatedLists.get({ id: node.lists });
          }
          return [];
        },
        activeList: (node, _, { repeatedListItems }) => {
          return repeatedListItems.getOne({ id: node.activeList });
        },
      },
      RepeatedList: {
        id: (node) => node.$loki,
        listItems: (node, _, { repeatedListItems }) => {
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
      archived: Boolean
      listItems: [RepeatableListItem]
      slug: String!
      activeList: RepeatedList
      lists: [RepeatedList!]
    }
    type RepeatedList {
      id: ID!
      completedTime: Int
      completed: Boolean!
      listItems: [RepeatedListItem!]
    }
    type RepeatedListItem {
      name: String!
      id: ID!
      slug: String
      completedTime: Int
      completed: Boolean!
    }
    input AddListInput {
      name: String!,
      listItems: [ID!]
    }
    input UpdateListInput {
      id: ID
      name: String,
      slug: String,
      listItems: [ID!]
    }
    input ListWhereArgs {
      id: ID
      name: String
      slug: String
    }
    input AddListItemToRepeatableListMutationInput {
      slug: String!
      item: String!
    }
    extend type Query {
      repeatableLists(where: ListWhereArgs): [RepeatableList!]
      repeatableList(where: ListWhereArgs): RepeatableList
    }
    extend type Mutation {
      addRepeatableList(list: AddListInput!): RepeatableList!
      updateRepeatableList(list: UpdateListInput!): RepeatableList!
      deleteRepeatableList(id: ID!): ID!
      addRepetition(where: ListWhereArgs!): RepeatableList!
      addListItemToRepeatableList(input: AddListItemToRepeatableListMutationInput!): RepeatableList!
      removeListItemToRepeatableList(input: AddListItemToRepeatableListMutationInput!): RepeatableList!
    }
   `,
  };
}

module.exports = RepeatableListSchemaFactory;