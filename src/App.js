import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Posts from './pages/Posts';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Statistics from './pages/Statistics';
import { ProvideAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {

  return (
    <BrowserRouter> 
    <ProvideAuth>
      <Header />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Posts />} />
          <Route path='/statistics' element={<Statistics />} />  
        </Route>
        <Route path='/registration' element={<Registration />} />
        <Route path='/login' element={<Login />} /> 
      </Routes> 
      </ProvideAuth>
    </BrowserRouter>
  );
}

export default App;
