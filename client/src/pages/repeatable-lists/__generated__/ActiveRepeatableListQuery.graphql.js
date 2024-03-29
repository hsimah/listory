/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ActiveRepeatableListItem$ref = any;
export type ActiveRepeatableListQueryVariables = {|
  slug: string
|};
export type ActiveRepeatableListQueryResponse = {|
  +repeatableList: ?{|
    +name: string,
    +activeList: ?{|
      +listItems: ?$ReadOnlyArray<{|
        +slug: ?string,
        +$fragmentRefs: ActiveRepeatableListItem$ref,
      |}>
    |},
  |}
|};
export type ActiveRepeatableListQuery = {|
  variables: ActiveRepeatableListQueryVariables,
  response: ActiveRepeatableListQueryResponse,
|};
*/


/*
query ActiveRepeatableListQuery(
  $slug: String!
) {
  repeatableList(where: {slug: $slug}) {
    name
    activeList {
      listItems {
        slug
        ...ActiveRepeatableListItem
      }
    }
    id
  }
}

fragment ActiveRepeatableListItem on RepeatedListItem {
  name
  slug
  completed
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
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActiveRepeatableListQuery",
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
            "concreteType": "RepeatedList",
            "kind": "LinkedField",
            "name": "activeList",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RepeatedListItem",
                "kind": "LinkedField",
                "name": "listItems",
                "plural": true,
                "selections": [
                  (v3/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ActiveRepeatableListItem"
                  }
                ],
                "storageKey": null
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
    "name": "ActiveRepeatableListQuery",
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
            "concreteType": "RepeatedList",
            "kind": "LinkedField",
            "name": "activeList",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RepeatedListItem",
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
                    "name": "completed",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
    "cacheID": "99e2bfabe04bde77eea92ebd92b786e4",
    "id": null,
    "metadata": {},
    "name": "ActiveRepeatableListQuery",
    "operationKind": "query",
    "text": "query ActiveRepeatableListQuery(\n  $slug: String!\n) {\n  repeatableList(where: {slug: $slug}) {\n    name\n    activeList {\n      listItems {\n        slug\n        ...ActiveRepeatableListItem\n      }\n    }\n    id\n  }\n}\n\nfragment ActiveRepeatableListItem on RepeatedListItem {\n  name\n  slug\n  completed\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '525edd65ed116690b04859597523eb2c';

module.exports = node;
