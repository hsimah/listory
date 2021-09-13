/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type RepeatableListMutationVariables = {|
  slug: string
|};
export type RepeatableListMutationResponse = {|
  +addRepetition: {|
    +__typename: string
  |}
|};
export type RepeatableListMutation = {|
  variables: RepeatableListMutationVariables,
  response: RepeatableListMutationResponse,
|};
*/


/*
mutation RepeatableListMutation(
  $slug: String!
) {
  addRepetition(where: {slug: $slug}) {
    __typename
    id
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "slug",
        "variableName": "slug"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RepeatableListMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "addRepetition",
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
    "name": "RepeatableListMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "addRepetition",
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
    "cacheID": "dfa9fec0e7f9b49301070bab18716b65",
    "id": null,
    "metadata": {},
    "name": "RepeatableListMutation",
    "operationKind": "mutation",
    "text": "mutation RepeatableListMutation(\n  $slug: String!\n) {\n  addRepetition(where: {slug: $slug}) {\n    __typename\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '20276add23690bef8b8c2a8cd4e89e68';

module.exports = node;
