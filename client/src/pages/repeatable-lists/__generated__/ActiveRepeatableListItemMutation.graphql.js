/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type ActiveRepeatableListItem$ref = any;
export type CompleteRepeatedListItemMutationInput = {|
  slug?: ?string,
  item?: ?string,
|};
export type ActiveRepeatableListItemMutationVariables = {|
  where: CompleteRepeatedListItemMutationInput
|};
export type ActiveRepeatableListItemMutationResponse = {|
  +completeRepeatedListItem: {|
    +$fragmentRefs: ActiveRepeatableListItem$ref
  |}
|};
export type ActiveRepeatableListItemMutation = {|
  variables: ActiveRepeatableListItemMutationVariables,
  response: ActiveRepeatableListItemMutationResponse,
|};
*/


/*
mutation ActiveRepeatableListItemMutation(
  $where: CompleteRepeatedListItemMutationInput!
) {
  completeRepeatedListItem(where: $where) {
    ...ActiveRepeatableListItem
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
    "name": "where"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "where",
    "variableName": "where"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActiveRepeatableListItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatedListItem",
        "kind": "LinkedField",
        "name": "completeRepeatedListItem",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ActiveRepeatableListItem"
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
    "name": "ActiveRepeatableListItemMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RepeatedListItem",
        "kind": "LinkedField",
        "name": "completeRepeatedListItem",
        "plural": false,
        "selections": [
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
            "kind": "ScalarField",
            "name": "completed",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8487f0c304ac46a2c02a245ba4ddf1e6",
    "id": null,
    "metadata": {},
    "name": "ActiveRepeatableListItemMutation",
    "operationKind": "mutation",
    "text": "mutation ActiveRepeatableListItemMutation(\n  $where: CompleteRepeatedListItemMutationInput!\n) {\n  completeRepeatedListItem(where: $where) {\n    ...ActiveRepeatableListItem\n  }\n}\n\nfragment ActiveRepeatableListItem on RepeatedListItem {\n  name\n  slug\n  completed\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '176d2137ebc113118a4dac3c3eaa9e79';

module.exports = node;
