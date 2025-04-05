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
import TableSortLabel from '@mui/material/TableSortLabel';

import ButtonMenu from './ButtonMenu';
import { useProductContext } from '../context/ProductContext';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: any },
  b: { [key in Key]: any },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


export default function Datatable() {
  const [rows, setRows] = useState<ProductInterface[]>([]);
  const {products, getProducts, loadingProducts,totalProducts} = useProductContext();
  const [page, setPage] = useState <number> (0);
  const [rowsPerPage, setRowsPerPage] = useState <number> (5);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ProductInterface>('id');

  const handleChangePage = (e: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProductInterface) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    getProducts(page*rowsPerPage, rowsPerPage);
  }, [page, rowsPerPage]);


  useEffect(() => {
    if (products) {
      const formattedRows: ProductInterface[] = products.map((product: any) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        images: product.images || [],
      }));
      setRows(formattedRows);
    }
  }, [products]);

  const visibleRows = React.useMemo(() => {
    return [...rows]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, rows]);
  

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
    <TableContainer component={Paper} sx={{ overflow: 'auto', borderRadius:'10px 10px 0px 0px' }} className='dataTable'>
      <Table  aria-label="product table">
        <TableHead>
          <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'id'}
                  direction={orderBy === 'id' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'id')}
                >
                  ID
                </TableSortLabel>
              </TableCell>
              <TableCell>Thumbnail</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'title'}
                  direction={orderBy === 'title' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'title')}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'price'}
                  direction={orderBy === 'price' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'price')}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell> 
                  Category
              </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadingProducts ? (
            skeletonRows()
          ) : (
            visibleRows.map((row) => (
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