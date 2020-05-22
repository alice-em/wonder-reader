import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const buttonStyle = {
  margin: '5px 5px 2px 2px',
  position: 'absolute',
  right: '0',
  top: '0',
};

const buttonTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#fff',
      main: '#eee',
      dark: '#ddd',
      text: '#000',
    },
    secondary: {
      light: '#ff867c',
      main: '#ef5350',
      dark: '#b61827',
      text: '#fff',
    },
  },
});

export { buttonStyle, buttonTheme };
