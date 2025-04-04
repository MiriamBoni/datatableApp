import React, {useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';

import useFilterProducts from '../hooks/useFilterProducts';
import { useProductContext } from '../context/ProductContext';

export default function FilterCategory() {
    const {categories}=useProductContext()
    const {concatFilters}=useFilterProducts();
    const [selectedCategoryId, setSelectedCategoryId]= useState<string | "">("");
    
    const handleChangeCategory = (e: SelectChangeEvent) => {
        setSelectedCategoryId(e.target.value);
        concatFilters("categoryId",e.target.value)
    }

    return (
        <>
          <Select
            value={selectedCategoryId}
            onChange={handleChangeCategory}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            input={<OutlinedInput startAdornment={<FilterListOutlinedIcon style={{ marginRight: 8 }} />} />}
            renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Category</em>;
                }
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