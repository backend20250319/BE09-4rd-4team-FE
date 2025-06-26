import { BrowserRouter } from 'react-router-dom';

import './index.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header.jsx';
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
