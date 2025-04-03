import React, {useState,useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { CategoryInterface } from '../types/category';

interface SelectedategoryProps {
    selectedCategoryId?:number;
    onChange: (categoryId:number)=> void;
}

const  SelectCategory: React.FC<SelectedategoryProps>=({selectedCategoryId, onChange}) =>{
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [categories, setCategories] = useState<CategoryInterface[] | []>([]);

      
  const handleChange = (event: SelectChangeEvent) => {
    const categoryId=Number(event.target.value);
    setSelectedCategory(categoryId);
    onChange(categoryId);
  };

    useEffect(() => {
      fetch('https://api.escuelajs.co/api/v1/categories')
        .then((res) => res.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((error) => console.error('Error fetching products:', error));
    }, []);

    useEffect(()=>{
      console.log(selectedCategoryId);
        if(selectedCategoryId){
            setSelectedCategory(selectedCategoryId)
        }
    },[selectedCategoryId])
  return (
    <FormControl sx={{ m: 1, minWidth: 300 }} size="medium">
      <InputLabel id="demo-select-small-label">Select a product category</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedCategory ? String(selectedCategory) : ""}
        label="Category"
        onChange={handleChange}
        renderValue={(selected)=>{
            const categorySelected = categories.find((category)=>category.id===Number(selected));
            return categorySelected ? (
                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img
                    src={categorySelected.image}
                    alt={categorySelected.name}
                    style={{ width: 24, height: 24, borderRadius: "50%" }}
                    />
                    {categorySelected.name}
                </div>
            ):(
                'Select a product category'
            )
        }}
      >
        {categories.map((category)=>(
            <MenuItem value={category.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img
                    src={category.image}
                    alt={category.name}
                    style={{ width: 24, height: 24, borderRadius: "50%" }}
                    />
                    {category.name}
                </div>
            </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
export default SelectCategory;