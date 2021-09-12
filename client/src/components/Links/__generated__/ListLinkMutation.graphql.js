/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ListLink$ref = any;
export type UpdateListInput = {|
  id?: ?string,
  name?: ?string,
  slug?: ?string,
  listItems?: ?$ReadOnlyArray<string>,
|};
export type ListLinkMutationVariables = {|
  list: UpdateListInput
|};
export type ListLinkMutationResponse = {|
  +updateRepeatableList: {|
    +$fragmentRefs: ListLink$ref
  |}
|};
export type ListLinkMutation = {|
  variables: ListLinkMutationVariables,
  response: ListLinkMutationResponse,
|};
*/


/*
mutation ListLinkMutation(
  $list: UpdateListInput!
) {
  updateRepeatableList(list: $list) {
    ...ListLink
    id
  }
}

fragment ListLink on RepeatableList {
  id
  name
  slug
  listItems {
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
    "name": "list"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "list",
    "variableName": "list"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ListLinkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "updateRepeatableList",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ListLink"
          }
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
    "name": "ListLinkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "updateRepeatableList",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "RepeatableListItem",
            "kind": "LinkedField",
            "name": "listItems",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ca058ced8b4c3a1e4ad78685a878113b",
    "id": null,
    "metadata": {},
    "name": "ListLinkMutation",
    "operationKind": "mutation",
    "text": "mutation ListLinkMutation(\n  $list: UpdateListInput!\n) {\n  updateRepeatableList(list: $list) {\n    ...ListLink\n    id\n  }\n}\n\nfragment ListLink on RepeatableList {\n  id\n  name\n  slug\n  listItems {\n    __typename\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4c8d4e0a01876e9613266e00f0798384';

module.exports = node;
