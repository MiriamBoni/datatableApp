import React from 'react';
import Datatable from '../components/Datatable';
import CreateProductDialog from '../components/CreateProductDialog';
import SearchBar from '../components/SearchBar';

const HomePage: React.FC = () => {
  return (
    <div className='page-wrapper'>
      <CreateProductDialog></CreateProductDialog>
      <SearchBar></SearchBar>
      <Datatable></Datatable>
    </div>
  );
};

export default HomePage;