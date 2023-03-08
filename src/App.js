import React from 'react';
import {BrowserRouter,  Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Posts from './pages/Posts';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Users from "./pages/Users";

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
