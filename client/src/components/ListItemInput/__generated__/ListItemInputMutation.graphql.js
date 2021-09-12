/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ListItemInputMutationVariables = {|
  slug: string,
  item: string,
|};
export type ListItemInputMutationResponse = {|
  +addListItemToRepeatableList: {|
    +listItems: ?$ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +slug: ?string,
    |}>
  |}
|};
export type ListItemInputMutation = {|
  variables: ListItemInputMutationVariables,
  response: ListItemInputMutationResponse,
|};
*/


/*
mutation ListItemInputMutation(
  $slug: String!
  $item: String!
) {
  addListItemToRepeatableList(input: {slug: $slug, item: $item}) {
    listItems {
      id
      name
      slug
    }
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "item"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "slug"
},
v2 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "item",
        "variableName": "item"
      },
      {
        "kind": "Variable",
        "name": "slug",
        "variableName": "slug"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "RepeatableListItem",
  "kind": "LinkedField",
  "name": "listItems",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ListItemInputMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "addListItemToRepeatableList",
        "plural": false,
        "selections": [
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ListItemInputMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "addListItemToRepeatableList",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6c7891ee7401e47b05e0b7fd917484e2",
    "id": null,
    "metadata": {},
    "name": "ListItemInputMutation",
    "operationKind": "mutation",
    "text": "mutation ListItemInputMutation(\n  $slug: String!\n  $item: String!\n) {\n  addListItemToRepeatableList(input: {slug: $slug, item: $item}) {\n    listItems {\n      id\n      name\n      slug\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0cfc4c3ec675211e1da51d658ed04a54';

module.exports = node;
