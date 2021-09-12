/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type AddRepeatableListButtonMutationVariables = {|
  name: string
|};
export type AddRepeatableListButtonMutationResponse = {|
  +addRepeatableList: {|
    +slug: string
  |}
|};
export type AddRepeatableListButtonMutation = {|
  variables: AddRepeatableListButtonMutationVariables,
  response: AddRepeatableListButtonMutationResponse,
|};
*/


/*
mutation AddRepeatableListButtonMutation(
  $name: String!
) {
  addRepeatableList(list: {name: $name}) {
    slug
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "name"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "name",
        "variableName": "name"
      }
    ],
    "kind": "ObjectValue",
    "name": "list"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AddRepeatableListButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "addRepeatableList",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddRepeatableListButtonMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "addRepeatableList",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "dcd5189f1e2cc6975f09d01d6300f56f",
    "id": null,
    "metadata": {},
    "name": "AddRepeatableListButtonMutation",
    "operationKind": "mutation",
    "text": "mutation AddRepeatableListButtonMutation(\n  $name: String!\n) {\n  addRepeatableList(list: {name: $name}) {\n    slug\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '0e091f4653481f935e14dd49de3bf901';

module.exports = node;
