import React, {useState,useEffect} from 'react';
import "./styles.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
const App: React.FC = ()=>{
    return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage></HomePage>}/>
            </Routes>
          </BrowserRouter>
    );
};

export default App;