import React from 'react';

import Item from './Item';

const styles = {
  LibraryItem: {
    marginLeft: '5vw',
    maxHeight: '50vh',
    maxWidth: '50vw',
  },
};

const generateLibraryItem = onContentClick => content => (
  <Item
    {...content}
    key={content.id}
    onRowClick={() => {
      onContentClick(content);
    }}
    style={styles.LibraryItem}
  />
);

export default generateLibraryItem;
