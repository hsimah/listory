/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ListItemInputQueryVariables = {|
  slug: string
|};
export type ListItemInputQueryResponse = {|
  +repeatableList: ?{|
    +listItems: ?$ReadOnlyArray<?{|
      +id: string,
      +name: string,
      +slug: ?string,
    |}>
  |}
|};
export type ListItemInputQuery = {|
  variables: ListItemInputQueryVariables,
  response: ListItemInputQueryResponse,
|};
*/


/*
query ListItemInputQuery(
  $slug: String!
) {
  repeatableList(where: {slug: $slug}) {
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "RepeatableListItem",
  "kind": "LinkedField",
  "name": "listItems",
  "plural": true,
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
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ListItemInputQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "repeatableList",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ListItemInputQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "repeatableList",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8bb3a80c0c6a88723659bc8d592811e3",
    "id": null,
    "metadata": {},
    "name": "ListItemInputQuery",
    "operationKind": "query",
    "text": "query ListItemInputQuery(\n  $slug: String!\n) {\n  repeatableList(where: {slug: $slug}) {\n    listItems {\n      id\n      name\n      slug\n    }\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '702f93fb21cbf807a350a7c52298677f';

module.exports = node;
