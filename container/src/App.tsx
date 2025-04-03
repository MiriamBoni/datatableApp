import React, {lazy,Suspense, useState, useEffect} from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from "./components/Header"
import Spinner from './components/Spinner';

const DatatableLazy = lazy(()=> import('./components/DatatableApp'))

// const theme = createTheme({
//     productionPrefix:'co',
// });


export default () =>{
      return (
        <Router>
        {/* <ThemeProvider theme={theme}> */}
          <Suspense fallback={<Spinner />}>
            <Header></Header>
            <Routes>
              <Route path="/" element={<DatatableLazy />} />
            </Routes>
          </Suspense>
        {/* </ThemeProvider> */}
      </Router>
      );
    };