import React from 'react';
import Table from '@material-ui/core/Table';

import Context from '../../../context/ContextFactory';
import CustomTableBody from './Body';
import HeaderRow from './HeaderRow';

const CustomTable = () => (
  <Context.Consumer>
    {({
      state: {
        content: { fullpath },
      },
    }) =>
      fullpath && (
        <Table className="library-menu" selectable="false">
          <HeaderRow />
          <CustomTableBody />
        </Table>
      )
    }
  </Context.Consumer>
);

export default CustomTable;
