/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RepeatableListItem$ref: FragmentReference;
declare export opaque type RepeatableListItem$fragmentType: RepeatableListItem$ref;
export type RepeatableListItem = {|
  +id: string,
  +name: string,
  +slug: ?string,
  +$refType: RepeatableListItem$ref,
|};
export type RepeatableListItem$data = RepeatableListItem;
export type RepeatableListItem$key = {
  +$data?: RepeatableListItem$data,
  +$fragmentRefs: RepeatableListItem$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RepeatableListItem",
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
    }
  ],
  "type": "RepeatableListItem",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'ffc57b6cf8cd303258188604da31568d';

module.exports = node;
