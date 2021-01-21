import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import MainContainer from './containers/MainContainer';
import Footer from './components/Footer';

// --cma-green: rgb(39,121,105);
// --cma-purple: rgb(142,98,165);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#eeeeee',
      // main: 'rgb(142,98,165)',
    },
    secondary: {
      main: 'rgb(142,98,165)',
      // main: 'rgb(39,121,105)',
    },
  },
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
