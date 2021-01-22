import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import MainContainer from './containers/MainContainer';
import Footer from './components/Footer';

// --cma-green: rgb(39,121,105);
// --cma-purple: rgb(142,98,165);
// https://material-ui.com/customization/globals/

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8e8e8e',
      main: '#616161',
      dark: '#373737',
      contrastText: '#ffffff',
    },
    // secondary: { // purple
    //   light: '#b084f4',
    //   main: '#7e56c1',
    //   dark: '#4d2b90',
    //   contrastText: '#ffffff',
    // },
    secondary: {
      light: '#ffffff',
      main: '#e0e0e0',
      dark: '#aeaeae',
      contrastText: '#000000',
    },
  },
  // overrides: {
  //   // Style sheet name ⚛️
  //   MuiButton: {
  //     // Name of the rule
  //     root: {
  //       // Some CSS
  //     },
  //   },
  // },
});

const withFooter = (WrappedComponent) => () => [
  <WrappedComponent key="1" />,
  <Footer key="2" />,
];

const WrapperWithFooter = withFooter(MainContainer);

const App = () => (
  <ThemeProvider theme={theme}>
    <div className="app-container">
      <WrapperWithFooter />
    </div>
  </ThemeProvider>
);
export default App;
