function RepeatableListItemSchemaFactory() {
  return {
    resolvers: {
      Query: {
        repeatableListItems: (_, { where }, { repeatableListItems }) => {
          return repeatableListItems.get(where);
        },
        repeatableListItem: (_, { where }, { repeatableListItems }) => {
          return repeatableListItems.getOne(where);
        },
      },
      Mutation: {
        upsertRepeatableListItem: (_, { listItem }, { repeatableListItems }) => {
          if (listItem.id != null) {
            return repeatableListItems.update(listItem);
          }
          return repeatableListItems.add(listItem);
        },
        deleteRepeatableListItem: (_, { id }, { repeatableListItems }) => {
          return repeatableListItems.delete({ id });
        },
      },
      RepeatableListItem: {
        id: (node) => node.$loki,
        name: (node) => node.name,
        slug: (node) => node.slug,
      },
    },
    typeDefs: `
    type RepeatableListItem {
      id: ID!
      name: String!
      slug: String
    }
    input RepeatableListItemMutationInput {
      id: ID
      name: String
      slug: String
    }
    input ReapeatableListItemWhereArgs {
      id: ID
      name: String
      slug: String
    }
    extend type Query {
      repeatableListItems(where: ReapeatableListItemWhereArgs): [RepeatableListItem!]
      repeatableListItem(where: ReapeatableListItemWhereArgs): RepeatableListItem
    }
    extend type Mutation {
      upsertRepeatableListItem(listItem: RepeatableListItemMutationInput): RepeatableListItem
      deleteRepeatableListItem(id: ID!): ID!
    }
   `,
  };
}

module.exports = RepeatableListItemSchemaFactory;