import React from 'react';
import Datatable from '../components/Datatable';
import CreateProductDialog from '../components/CreateProductDialog';
import SearchBar from '../components/SearchBar';
import FilterCategory from '../components/FilterCategory';


const HomePage: React.FC = () => {
  return (
    <div className='page-wrapper'>
      <div>
        <CreateProductDialog></CreateProductDialog>
      </div>
      <div>
        <SearchBar></SearchBar>
        <FilterCategory></FilterCategory>
      </div>
      <Datatable></Datatable>
    </div>
  );
};

export default HomePage;