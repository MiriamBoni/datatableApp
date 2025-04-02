import React from 'react';
import Datatable from '../components/Datatable';
import CreateProductDialog from '../components/CreateProductDialog';

const HomePage: React.FC = () => {
  return (
    <div className='page-wrapper'>
       <CreateProductDialog></CreateProductDialog>
      <Datatable></Datatable>
    </div>
  );
};

export default HomePage;