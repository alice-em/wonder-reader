import PropTypes from 'prop-types';
import React, { memo } from 'react';

import Context from '../../context/ContextFactory';

const ZoomController = ({ children }) => (
  <Context.Consumer>
    {({ state: { zoomLevel } }) => (
      <div
        className="pages"
        style={{
          marginLeft: `${(100 - zoomLevel) / 2}%`,
          marginTop: `${(100 - zoomLevel) / 2}%`,
          height: `${zoomLevel}%`,
          width: `${zoomLevel}%`,
        }}
      >
        {children}
      </div>
    )}
  </Context.Consumer>
);

ZoomController.propTypes = {
  children: PropTypes.node.isRequired,
};

export default memo(ZoomController);
