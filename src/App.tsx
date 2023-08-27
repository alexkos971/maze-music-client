import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';  
import "./styles/__app.scss";

import Home from './pages/Home';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/home');
  }, []);

  return (
    <>
      <Routes>
        <Route path='/home' element={<Home/>} />
      </Routes>
    </>
  );
}

export default App;
