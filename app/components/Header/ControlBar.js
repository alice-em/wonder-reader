import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import * as Button from './Buttons';
import Slider from './Slider';
import { buttonStyle, buttonTheme } from './Buttons/buttonStyle';

const ControlBar = () => (
  <MuiThemeProvider theme={buttonTheme}>
    <div style={buttonStyle}>
      <Slider />
      <Button.OpenLibrary />
      <Button.ChangePageCount />
      <Button.OpenPreviousComic />
      <Button.TurnPageLeft />
      <Button.TurnPageRight />
      <Button.OpenNextComic />
    </div>
  </MuiThemeProvider>
);

export default ControlBar;
