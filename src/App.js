import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/Header";
import Posts from './pages/Posts';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Users from "./pages/Users";
import { ProvideAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {

  return (
  
    <BrowserRouter> 
    <ProvideAuth>
      <Header />
      <Routes>
        <Route path='/' element={<Posts />} />
        <Route element={<ProtectedRoute />}>
          {/* <Route path='/' element={<Posts />} /> */}
          <Route path='/users' element={<Users />} />  
        </Route>
        {/* <Route path='/users' element={<Users />} /> */}
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} /> 
      </Routes> 
      </ProvideAuth>
    </BrowserRouter>
    
  );
}

export default App;
