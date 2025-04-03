import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./styles.scss";

import HomePage from './pages/HomePage';
const App: React.FC = ()=>{
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}/>
          </Routes>
        </BrowserRouter>

        <Toaster position="top-center" reverseOrder={false} />
      </>
    );
};

export default App;