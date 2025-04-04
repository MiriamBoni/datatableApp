import React, { useEffect, useState } from 'react';
import {ProductInterface} from "../types/product"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

import ButtonMenu from './ButtonMenu';
import { useProductContext } from '../context/ProductContext';


export default function Datatable() {
  const [rows, setRows] = useState<ProductInterface[]>([]);
  const {products, getProducts, loadingProducts,totalProducts} = useProductContext();
  const [page, setPage] = useState <number> (0);
  const [rowsPerPage, setRowsPerPage] = useState <number> (5);
  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  useEffect(() => {
    getProducts(page*rowsPerPage, rowsPerPage);
  }, [page, rowsPerPage]);

  useEffect(() => {
    if(products){
      const formattedRows:ProductInterface[]= products.map((product: any) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category:  product.category ,
        images: product.images || [],
      }));
      setRows(formattedRows);
    }
  
  }, [products]);

  const skeletonRows = () =>{
    return(
      <>
      <TableRow> 
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>      
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>      
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>      
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>       
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>    
        </TableRow>
        <TableRow> 
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>      
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>      
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>      
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>    
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>       
        </TableRow>
        <TableRow> 
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>      
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>      
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>      
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>         
          <TableCell> 
          <Skeleton variant="rounded" width={100} height={10} />  
          </TableCell>  
        </TableRow>
      </>
    )
  }


  return (
    <>
    <TableContainer component={Paper} sx={{ overflow: 'auto' }}>
      <Table  aria-label="product table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Thumbnail</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadingProducts ? (
            skeletonRows()
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  {row.images.length > 0 ? (
                    <img src={row.images[0]} alt={row.title} width={50} height={50} />
                  ) : (
                    'No Image'
                  )}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>${row.price.toFixed(2)}</TableCell>
                <TableCell>{row.category.name}</TableCell>
                <TableCell>                 
                      <ButtonMenu productSelected={row}></ButtonMenu> 
                  </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalProducts}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
  
    </>
  );
}