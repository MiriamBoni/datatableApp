import React, {lazy,Suspense} from 'react';
import Skeleton from '@mui/material/Skeleton';

const LazyDatatable = lazy(() => import('../components/Datatable'));
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
      <Suspense fallback={<Skeleton variant="rounded" width={1100} height={300} />}>
        <LazyDatatable />
      </Suspense>
    </div>
  );
};

export default HomePage;