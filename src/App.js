import React from 'react';
import MainContainer from './containers/MainContainer';
import Footer from './components/Footer'

const withFooter = WrappedComponent => () => [
    <WrappedComponent key="1" />,
    <Footer key="2" />
  ];

const WrapperWithFooter = withFooter( MainContainer );

const App = () => (
    <div className = "app-container">
        <WrapperWithFooter />
    </div>
);
export default App;
