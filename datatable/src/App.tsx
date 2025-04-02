import React, {useState,useEffect} from 'react';
import "./styles.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Datatable from './components/Datatable';
const App: React.FC = ()=>{
    return (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Datatable></Datatable>}/>
            </Routes>
          </BrowserRouter>
    );
};

export default App;