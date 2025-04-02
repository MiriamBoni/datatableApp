import React, {useState } from "react";
import {useProductContext} from "../context/ProductContext"
import {ProductInterface} from "../types/product"
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import ProductDialog from './ProductDialog';

interface ButtonMenuProps{
    productSelected: ProductInterface;  
}
  

const ButtonMenu: React.FC<ButtonMenuProps> = ({ productSelected }) => {
    const {setSelectedProduct,selectedProduct} = useProductContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openProductDialog, setOpenProductDialog] = useState(false);
    
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(productSelected);
  };
  const handleOpenProductDialog = () =>{
    setOpenProductDialog(true);
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseDialog = () => {
    setOpenProductDialog(false);
  };
  return (
    <React.Fragment>
         <Tooltip title="Actions">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-haspopup="true"
          >
            <AddCircleOutlineIcon></AddCircleOutlineIcon>
          </IconButton>
        </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenProductDialog}>
            <ListItemIcon>
                <VisibilityOutlinedIcon fontSize="small" />
            </ListItemIcon>
             View
        </MenuItem>
        <MenuItem onClick={handleClose}>
            <ListItemIcon>
                <EditOutlinedIcon fontSize="small" />
            </ListItemIcon>
          Edit
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} sx={{ color: "#ff0f0f" }}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon fontSize="small" sx={{ color: "#ff0f0f" }} />
          </ListItemIcon>
            Delete
        </MenuItem>
      </Menu>
      <ProductDialog  openProductDialog={openProductDialog} setClose={handleCloseDialog}></ProductDialog>
    </React.Fragment>
  );
}
export default ButtonMenu;