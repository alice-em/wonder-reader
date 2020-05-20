import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { FaPercent } from 'react-icons/fa';

import ItemIcon from './ItemIcon';
// import Bookmark from './Bookmark.js';

const styles = {
  bbb: {
    color: '#bbb',
  },
  percent: {
    color: '#999',
    fontSize: '14px',
  },
  TableRow: {
    cursor: 'pointer',
    fontFamily: 'Montserrat',
    fontSize: '20px',
  },
  three33: {
    color: '#333',
  },
  wide: {
    width: '10px',
  },
};

const Item = ({ basename, dirname, id, isDirectory, onRowClick }) => (
  <TableRow
    className="library-item"
    key={id}
    onClick={onRowClick}
    style={styles.TableRow}
  >
    <TableCell padding="checkbox" style={styles.wide}>
      <ItemIcon iconSize={30} isDirectory={isDirectory} />
    </TableCell>
    <TableCell style={styles.three33}>{basename}</TableCell>
    <TableCell style={styles.bbb}>
      {dirname}
    </TableCell>
    <TableCell padding="checkbox" style={styles.wide}>
      <FaPercent style={styles.percent} />
    </TableCell>
  </TableRow>
);

Item.propTypes = {
  basename: PropTypes.string.isRequired,
  dirname: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDirectory: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default Item;
