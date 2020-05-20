import PropTypes from 'prop-types';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { FaPercent } from 'react-icons/fa';

import Item from './Item';

const styles = {
  font: {
    fontFamily: 'Carter One',
  },
  LibraryItem: {
    marginLeft: '5vw',
    maxHeight: '50vh',
    maxWidth: '50vw',
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

const CustomTable = ({ contents, onContentClick }) => (
  <Table className="library-menu" selectable="false">
    <HeaderRow />
    <TableBody>{contents.map(generateLibraryItem(onContentClick))}</TableBody>
  </Table>
);

CustomTable.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      basename: PropTypes.string.isRequired,
      dirname: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isDirectory: PropTypes.bool.isRequired,
    }),
  ),
  onContentClick: PropTypes.func.isRequired,
};

CustomTable.defaultProps = {
  contents: [],
};

export { generateLibraryItem, HeaderRow };
export default CustomTable;
