/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type RepeatableListItem$ref = any;
export type RepeatableListQueryVariables = {|
  slug: string
|};
export type RepeatableListQueryResponse = {|
  +repeatableList: ?{|
    +name: string,
    +listItems: ?$ReadOnlyArray<?{|
      +id: string,
      +$fragmentRefs: RepeatableListItem$ref,
    |}>,
  |}
|};
export type RepeatableListQuery = {|
  variables: RepeatableListQueryVariables,
  response: RepeatableListQueryResponse,
|};
*/


/*
query RepeatableListQuery(
  $slug: String!
) {
  repeatableList(where: {slug: $slug}) {
    name
    listItems {
      id
      ...RepeatableListItem
    }
    id
  }
}

fragment RepeatableListItem on RepeatableListItem {
  id
  name
  slug
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
  "name": "name",
  "storageKey": null
},
v3 = {
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
    "name": "RepeatableListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "repeatableList",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "RepeatableListItem",
            "kind": "LinkedField",
            "name": "listItems",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RepeatableListItem"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RepeatableListQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatableList",
        "kind": "LinkedField",
        "name": "repeatableList",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "RepeatableListItem",
            "kind": "LinkedField",
            "name": "listItems",
            "plural": true,
            "selections": [
              (v3/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "slug",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "0e2b7c822dd045b1cacf697be84b640f",
    "id": null,
    "metadata": {},
    "name": "RepeatableListQuery",
    "operationKind": "query",
    "text": "query RepeatableListQuery(\n  $slug: String!\n) {\n  repeatableList(where: {slug: $slug}) {\n    name\n    listItems {\n      id\n      ...RepeatableListItem\n    }\n    id\n  }\n}\n\nfragment RepeatableListItem on RepeatableListItem {\n  id\n  name\n  slug\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ed99581b87a94dc9e6428b7d48b4f92f';

module.exports = node;
