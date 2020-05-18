import React from 'react';
import { FaAngleRight } from 'react-icons/fa';

import Button from './Button';
import Context from '../../../context/ContextFactory';

const TurnPageRight = () => (
  <Context.Consumer>
    {({ turnPageRight }) => (
      <Button onClick={turnPageRight}>
        <FaAngleRight />
      </Button>
    )}
  </Context.Consumer>
);

export default TurnPageRight;
