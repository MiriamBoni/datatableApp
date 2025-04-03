import React, {useState,useEffect} from 'react';
import { useProductContext } from '../context/ProductContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export default function CreateProductDialog() {
  const {searchProducts}=useProductContext();
    return (
      <>
      <TextField
        fullWidth
        label="Enter your name"
        variant="outlined" 
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          },
        }}
        type="text" placeholder="Search..." onChange={(e) => searchProducts(e.target.value)}
        sx={{borderRadius: "20px"}}
      />
      </>
  );
}
