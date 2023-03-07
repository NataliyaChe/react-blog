import React from 'react';
import {BrowserRouter,  Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Posts from './components/Posts';
import Registration from './components/Registration';
import Login from './components/Login';
import Users from "./components/Users";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/users' element={<Users />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
