import React from 'react';
import {BrowserRouter,  Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Main from './components/Main'
import Registration from './components/Registration'
import Login from './components/Login'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
