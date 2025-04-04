import React from 'react';
import Datatable from '../components/Datatable';
import CreateProductDialog from '../components/CreateProductDialog';
import SearchBar from '../components/SearchBar';
import FilterCategory from '../components/FilterCategory';
import PriceSlider from '../components/PriceSlider';


const HomePage: React.FC = () => {
  return (
    <div className='page-wrapper'>
      <div>
        <CreateProductDialog></CreateProductDialog>
      </div>
      <div className="filterDiv">
        <SearchBar></SearchBar>
        <FilterCategory></FilterCategory>
        <PriceSlider></PriceSlider>
      </div>
      <Datatable></Datatable>
    </div>
  );
};

export default HomePage;