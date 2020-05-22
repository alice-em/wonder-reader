import React from 'react';

import * as Buttons from './Buttons';

const ControlBar = () => (
  <div>
    <Buttons.OpenDirectory />
    <Buttons.SetParentAsLibrary />
    <Buttons.CloseLibrary />
  </div>
);

export default ControlBar;
