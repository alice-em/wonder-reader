import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';

import Button from './Button';
import Context from '../../../context/ContextFactory';

const TurnPageLeft = () => (
  <Context.Consumer>
    {({ turnPageLeft }) => (
      <Button onClick={turnPageLeft}>
        <FaAngleLeft />
      </Button>
    )}
  </Context.Consumer>
);

export default TurnPageLeft;
