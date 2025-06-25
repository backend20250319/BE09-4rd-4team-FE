import { BrowserRouter } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Main from './pages/Main';
import Menu from './components/Menu';
import React from 'react';

export default function App(props) {
  return (
    <BrowserRouter>
      <Header />
      <Menu />
      <Main />
      <Footer />
    </BrowserRouter>
  );
}
