/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ActiveRepeatableListItem$ref: FragmentReference;
declare export opaque type ActiveRepeatableListItem$fragmentType: ActiveRepeatableListItem$ref;
export type ActiveRepeatableListItem = {|
  +name: string,
  +slug: ?string,
  +completed: boolean,
  +$refType: ActiveRepeatableListItem$ref,
|};
export type ActiveRepeatableListItem$data = ActiveRepeatableListItem;
export type ActiveRepeatableListItem$key = {
  +$data?: ActiveRepeatableListItem$data,
  +$fragmentRefs: ActiveRepeatableListItem$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActiveRepeatableListItem",
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
  "type": "RepeatedListItem",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '31ed300ceba4ef73324f1cfc0f1cb6b4';

module.exports = node;
