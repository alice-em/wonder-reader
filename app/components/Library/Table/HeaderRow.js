import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FaPercent } from 'react-icons/fa';

const styles = {
  font: {
    fontFamily: 'Carter One',
  },
};

const HeaderRow = () => (
  <TableHead>
    <TableRow style={styles.font}>
      <TableCell padding="checkbox" />
      <TableCell>Name</TableCell>
      <TableCell>Directory</TableCell>
      <TableCell padding="checkbox">
        <FaPercent />
      </TableCell>
    </TableRow>
  </TableHead>
);

export default HeaderRow;
