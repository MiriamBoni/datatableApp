import React, {useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import IconButton from '@mui/material/IconButton';

import useFilterProducts from '../hooks/useFilterProducts';
import { useProductContext } from '../context/ProductContext';

export default function FilterCategory() {
    const {categories, getProducts}=useProductContext()
    const {concatFilters}=useFilterProducts();
    const [selectedCategoryId, setSelectedCategoryId]= useState<string | "">("");
    
    const handleChangeCategory = (e: SelectChangeEvent) => {
        setSelectedCategoryId(e.target.value);
        concatFilters("categoryId",e.target.value)
    }
    const handleClearSelect = () => {
      setSelectedCategoryId("");
      getProducts();
    }

    return (
        <>
          <Select
            value={selectedCategoryId}
            onChange={handleChangeCategory}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ fontStyle: 'normal'}}
            input={<OutlinedInput 
              startAdornment={<FilterListOutlinedIcon style={{ marginRight: 8 }} />} 
              endAdornment={selectedCategoryId && (
                <IconButton onClick={handleClearSelect}
                  style={{
                    marginLeft: 8,
                  }}>
                  <ClearOutlinedIcon/>
                </IconButton>
            )
              } />}
            renderValue={(selected) => {
                const selectedCategory = categories.find((category) => String(category.id) === String(selected) );
                return selectedCategory ? selectedCategory.name : <em>Category</em>;
            }}
          >
            {categories.map((category)=>(
            <MenuItem value={category.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {category.name}
                </div>
            </MenuItem>
        ))}
          </Select>

      </>
    );
}