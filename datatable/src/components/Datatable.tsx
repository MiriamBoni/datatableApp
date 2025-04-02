import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import ButtonMenu from './ButtonMenu';

type Product = {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  category: string;
};

export default function Datatable() {
  const [rows, setRows] = useState<Product[]>([]);


  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then((res) => res.json())
      .then((data) => {
        const formattedRows = data.map((product: any) => ({
          id: product.id,
          thumbnail: product.images?.[0] || '',
          title: product.title,
          price: product.price,
          category: product.category?.name || 'Unknown', 
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
              <TableCell>{row.category}</TableCell>
              <TableCell>                 
                    <ButtonMenu></ButtonMenu> 
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  
    </>
  );
}