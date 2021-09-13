import * as React from 'react';
import BaseLink from './BaseLink';

function ListItemLink({ name, lists = [], slug, onDelete }) {
  return <BaseLink
    primary={name}
    secondary={`List count: ${lists.length}`}
    onDelete={onDelete}
    slug={slug}
    type='list-item' />;
}

export default ListItemLink;