import React, {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import useFilterProducts from '../hooks/useFilterProducts';

export default function CreateProductDialog() {
  const{concatFilters} =useFilterProducts();
    return (
      <>
      <TextField
        className='searchBar'
        fullWidth
        label=""
        variant="outlined" 
         size="small"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          },
        }}
        type="text" placeholder="Search product by title" onChange={(e) => concatFilters("title",e.target.value)}
        sx={{borderRadius: "20px"}}
      />
      </>
  );
}
