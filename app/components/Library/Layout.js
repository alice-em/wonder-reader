import React, { memo } from 'react';

import Header from './Header';
import Table from './Table/Table';

const styles = {
  libraryStyles: {
    marginTop: '64px',
    maxHeight: 'calc(90vh - 64px)',
    overflowY: 'auto',
  },
};

const Layout = () => (
  <div className="library" style={styles.libraryStyles}>
    <Header />
    <Table  />
  </div>
);

export { Layout };
export default memo(Layout);
