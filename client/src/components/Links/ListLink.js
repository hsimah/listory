import React from 'react';
import BaseLink from './BaseLink';

function ListLink({ name, listItems = [], slug, onDelete }) {
  return <BaseLink
    primary={name}
    secondary={`Item count: ${listItems.length}`}
    onDelete={onDelete}
    slug={slug}
    type='list' />;
}

export default ListLink;