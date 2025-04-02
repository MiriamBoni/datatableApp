import React, { useEffect, useState } from 'react';
import {ProductInterface} from "../types/product"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import ButtonMenu from './ButtonMenu';


export default function Datatable() {
  const [rows, setRows] = useState<ProductInterface[]>([]);


  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => res.json())
      .then((data) => {
        const formattedRows:ProductInterface[]= data.map((product: any) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category:  product.category?.name || "Unknown" ,
          thumbnail: product.images?.[0] || '',
        }));
        setRows(formattedRows);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);


  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="product table">
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>
                {row.thumbnail ? (
                  <img src={row.thumbnail} alt={row.title} width={50} height={50} />
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
    </>
  );
}