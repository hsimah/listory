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
        addRepetition: (_, { where }, { repeatableLists }) => {
          const list = repeatableLists.getOne(where);

          // complete previous active list
          const [lastRepeatedList] = list.lists;
          lastRepeatedList.completedTime = Date.now();

          // create new active list & save
          const repeatedList = {
            listItems: list.listItems != null ? list.listItems : [],
          };
          list.activeList = repeatedList;
          list.lists = [repeatedList, ...list.lists];
          return repeatableLists.update(list);
        },
        completeRepeatedListItem: (_, { where }, { repeatableLists }) => {
          const list = repeatableLists.getOne({ slug: where.slug });
          const item = list.activeList.listItems.find((i) => i.slug === where.item);
          item.completedTime = Date.now();
          const isListComplete = list.activeList.listItems.every((i) => i.completedTime != null);
          if (isListComplete) {
            // complete previous active list
            const [lastRepeatedList] = list.lists;
            lastRepeatedList.completedTime = Date.now();

            // create new active list & save
            const repeatedList = {
              listItems: list.listItems != null ? list.listItems : [],
            };
            list.activeList = repeatedList;
            list.lists = [repeatedList, ...list.lists];
          }
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
        listItems: (node) => {
          return node.listItems != null ? node.listItems : [];
        },
        completedTime: (node) => node.completedTime,
        completed: (node) => node.completedTime != null,
      },
      RepeatedListItem: {
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
      completedTime: Int
      completed: Boolean!
      listItems: [RepeatedListItem!]
    }
    type RepeatedListItem {
      name: String!
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
    input CompleteRepeatedListItemMutationInput {
      slug: String
      item: String
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
      completeRepeatedListItem(where: CompleteRepeatedListItemMutationInput!): RepeatedListItem!
    }
   `,
  };
}

module.exports = RepeatableListSchemaFactory;