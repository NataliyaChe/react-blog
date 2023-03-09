import React, { useState } from 'react';
import {BrowserRouter,  Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Posts from './pages/Posts';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Users from "./pages/Users";
import {HeaderContext} from './utils/HeaderContext';
// import {HeaderProvider} from './utils/HeaderContext'

function App() {
  // const [authorizedUser, setAuthorizedUser] = useState()
  const [isVisible, setIsVisible] = useState(false);
  console.log('isVisible', isVisible);
  const toggleIsVisible = () => {
    setIsVisible(!isVisible)
  }
  return (
  
    <BrowserRouter> 
    <HeaderContext.Provider value={isVisible}>
      <Header />
      <Routes>
        <Route path='/' element={<Posts toggle={toggleIsVisible}/>} />
        <Route path='/users' element={<Users />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login toggle={toggleIsVisible}/>} />
        
      </Routes> 
      </HeaderContext.Provider> 
    </BrowserRouter>
    
  );
}

export default App;
