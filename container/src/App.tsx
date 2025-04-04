import React, {lazy,Suspense} from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from "./components/Header"
import Spinner from './components/Spinner';

const DatatableLazy = lazy(()=> import('./components/DatatableApp'))


export default () =>{
  return (
    <Router>
      <Suspense fallback={<Spinner />}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<DatatableLazy />} />
        </Routes>
      </Suspense>
  </Router>
  );
};