import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Product = {
    id: number;
    thumbnail: string;
    title: string;
    price: number;
    category: string;
};
function createData(
    id:number,
    thumbnail: string,
    title: string,
    price: number,
    category: string,
): Product {
    return { id,thumbnail, title, price, category };
}


export default function Datatable() {
    const [rows, setRows] = useState<Product[]>([]);
    const [products, setProducts] = useState<any[]>([]); 
    useEffect(() => {
        fetch('https://api.escuelajs.co/api/v1/products')
          .then((res) => res.json())
        .then((data) => setProducts(data || []));        
      }, []);
    useEffect(() => {
        const formattedRows = products.map((product) =>
          createData(product.id, product.images[0], product.title, product.price, product.category)
        );
        setRows(formattedRows);
      }, [products]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.thumbnail}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}