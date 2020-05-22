import React from 'react';
import TableBody from '@material-ui/core/TableBody';

import Context from '../../../context/ContextFactory';
import generateItem from './generateItem';

const CustomTableBody = () => (
  <TableBody>
    <Context.Consumer>
      {({
        onContentClick,
        state: {
          content: { contents },
        },
      }) => contents.map(generateItem(onContentClick))}
    </Context.Consumer>
  </TableBody>
);

export default CustomTableBody;
