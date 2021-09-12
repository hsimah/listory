/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RepeatableListItemMutationVariables = {|
  slug: string,
  item: string,
|};
export type RepeatableListItemMutationResponse = {|
  +removeListItemFromRepeatableList: {|
    +id: string
  |}
|};
export type RepeatableListItemMutation = {|
  variables: RepeatableListItemMutationVariables,
  response: RepeatableListItemMutationResponse,
|};
*/


/*
mutation RepeatableListItemMutation(
  $slug: String!
  $item: String!
) {
  removeListItemFromRepeatableList(input: {slug: $slug, item: $item}) {
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
    "alias": null,
    "args": [
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
    "concreteType": "RepeatableList",
    "kind": "LinkedField",
    "name": "removeListItemFromRepeatableList",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RepeatableListItemMutation",
    "selections": (v2/*: any*/),
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
    "name": "RepeatableListItemMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "9267402b91b38c0819e5b4547d388824",
    "id": null,
    "metadata": {},
    "name": "RepeatableListItemMutation",
    "operationKind": "mutation",
    "text": "mutation RepeatableListItemMutation(\n  $slug: String!\n  $item: String!\n) {\n  removeListItemFromRepeatableList(input: {slug: $slug, item: $item}) {\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '2beff9eb8c68b45cc2b497b06ecb03b8';

module.exports = node;
