/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ListLink$ref: FragmentReference;
declare export opaque type ListLink$fragmentType: ListLink$ref;
export type ListLink = {|
  +id: string,
  +name: string,
  +slug: string,
  +listItems: ?$ReadOnlyArray<?{|
    +__typename: string
  |}>,
  +$refType: ListLink$ref,
|};
export type ListLink$data = ListLink;
export type ListLink$key = {
  +$data?: ListLink$data,
  +$fragmentRefs: ListLink$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListLink",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RepeatableList",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '31e7acbfe96c3473cd6f7603f5054d91';

module.exports = node;
