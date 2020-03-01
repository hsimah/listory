# Design Doc

## Overview
Listory is an app which creates lists of lists. For example you may create a list of beach items and a list of picnic items. Should you want to go to the beach you would create a transient list and add your beach list. This will load all beach items into your list. Maybe you want to have a beach picnic - if you add both lists you will get a de-duplicated list of all items from both sub lists.

### List types
#### Master
These are persisted lists with transient items. e.g. a shopping list. 

Master lists can be filtered by tags. 

e.g. a shopping list might be filtered for:
 - perishables or non-perishables.
 - necessities to view items regarded as high priority (e.g. milk).

#### Sub
These are persisted lists with non-transient items e.g. a packing list for a beach trip.

Sub lists can be copied into Master lists as transient items without mutating the original Sub list.

### Transient
Transient lists are created for a single use and disposed of. e.g. for a weekend away a list is generated

## Entities
This section contains an overview of entity types for MVP.

### List Item
- Name [_string_] the name of the item
- ID [_GUID_] the unique ID of the item
- Lists [_GUID[]_] a collection of list IDs that item is a member of
- Tags [_Tag[]_] a collection of tags for the item

### List
- Name [_string_] the name of the list
- ID [_GUID_] the unique ID of the list
- Type [_enum_] the type of list (master, sub, transient)
- Tags [_Tag[]_] a collection of tags for the list
- Archived [_bool_] whether the list has beeen archived

## Business Logic
Serverside architechture will be built on:
- expressjs for serverside routing
- Apollo Server for GraphQL provider
- Lokijs for data persistence

### Lists
#### Database

#### Mutations
##### `addList(name, type)`
- creates a new list with name `name` and type `type`
##### `mergeLists(sourceId, destinationIdtargetId)`
- adds all items from list `sourceId` to list `targetId`
##### `archiveList(id)`
- sets archive flag on list `id`

### List Items
#### Mutations
##### `addItem(name, listId, tags)`
- adds an item with name `name` and tags `tags` to list `listId`
  - upsert tags if necessary