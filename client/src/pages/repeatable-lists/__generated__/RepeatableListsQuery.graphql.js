/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ListLink$ref = any;
export type RepeatableListsQueryVariables = {||};
export type RepeatableListsQueryResponse = {|
  +repeatableLists: ?$ReadOnlyArray<{|
    +id: string,
    +$fragmentRefs: ListLink$ref,
  |}>
|};
export type RepeatableListsQuery = {|
  variables: RepeatableListsQueryVariables,
  response: RepeatableListsQueryResponse,
|};
*/


/*
query RepeatableListsQuery {
  repeatableLists {
    id
    ...ListLink
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
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RepeatableListsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "repeatableLists",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ListLink"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RepeatableListsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "repeatableLists",
        "plural": true,
        "selections": [
          (v0/*: any*/),
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
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a4f179e885d8b57513cee54869260bb6",
    "id": null,
    "metadata": {},
    "name": "RepeatableListsQuery",
    "operationKind": "query",
    "text": "query RepeatableListsQuery {\n  repeatableLists {\n    id\n    ...ListLink\n  }\n}\n\nfragment ListLink on RepeatableList {\n  id\n  name\n  slug\n  listItems {\n    __typename\n    id\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '5dbd25e4992e79d74926d6d3c0ac752b';

module.exports = node;
