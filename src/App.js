import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Content from './components/Content';
import Register from './components/register/Register';
import login from './components/login/login';


class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <SideBar />
        <Content />
        <register/>
        <login/>

  
      </div>
    );
  }
}

export default App;
