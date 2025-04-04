import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FilterList from "@mui/icons-material/FilterList";

import useFilterProducts from '../hooks/useFilterProducts'
import { useProductContext } from "../context/ProductContext";

function valuetext(value: number) {
  return `${value}`;
}

export default function PriceSlider() {
  const [value, setValue] = useState<number[]>([50, 100]);
  const [currentValue,setCurrentValue] = useState<string>("Price range");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {getProducts} = useProductContext();

  const {concatFilters} =useFilterProducts();

  const handleChange = (_event: Event, newValue: number[]) => {
    setValue(newValue);
  };
  const handleConfirmPriceRange = () =>{
    let currentValueConfirmed=`${value[0]} - ${value[1]}`
    setCurrentValue(currentValueConfirmed)
    concatFilters("price_min", value[0].toString());
    concatFilters("price_max", value[1].toString());
    handleClose();

  }
  const handleClearPriceRange = () =>{
    setCurrentValue("Price range");
    getProducts();
    handleClose();

  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<FilterList />}
        onClick={handleClick}
      >
        {currentValue}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>
          <Box sx={{ width: 250, p: 2 }}>
            <Slider
              getAriaLabel={() => "Price range"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="on"
              getAriaValueText={valuetext}
              min={0}
              max={500}
            />

          </Box>  
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                  variant="outlined"
                  onClick={handleClearPriceRange}
                  disableElevation
                    className='btnOutlined'
              >
                  Clear
              </Button>
              <Button
                  variant="contained"
                  onClick={handleConfirmPriceRange}
                  disableElevation
              >
                  Confirm
              </Button>
          </Box> 
        </MenuItem>
      </Menu>
    </div>
  );
}