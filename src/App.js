import React, { useState } from 'react';
import {BrowserRouter,  Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Posts from './pages/Posts';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Users from "./pages/Users";
import {AuthContext} from './utils/AuthContext';

function App() {
  const [user, setUser] = useState(false);

  const toggleUser = ()=> {
    setUser(!user)
  }

  return (
  
    <BrowserRouter> 
    <AuthContext.Provider value={{user, setUser, toggleUser}}>
      <Header />
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route path='/users' element={<Users />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} /> 
      </Routes> 
      </AuthContext.Provider> 
    </BrowserRouter>
    
  );
}

export default App;
