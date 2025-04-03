import React, {useState,useEffect} from 'react';
import { useProductContext } from '../context/ProductContext';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import  IconButton  from '@mui/material/IconButton';
import Tooltip  from '@mui/material/Tooltip';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';


interface ProductDialogProps {
  openDeleteProductDialog: boolean;
  setClose: () => void;
}

const DeleteProductDialog: React.FC<ProductDialogProps> = ({ openDeleteProductDialog, setClose }) => {
  const handleCloseDialog = () => {
    setClose();
  };
  const { selectedProduct, deleteProduct } = useProductContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setClose();
  };
  const handleDeleteProduct = () =>{
    if (selectedProduct?.id) {
      deleteProduct(selectedProduct.id)
      .then(()=>{
        handleCloseDialog();
      })
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openDeleteProductDialog}
      maxWidth="lg"
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          position: 'relative',
          paddingRight: '48px',  
        }}
      >
      <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
   
        <DeleteIcon sx={{ fontSize: 40, color: '#cd3131', marginBottom: 2, backgroundColor:"#ffcaca", borderRadius:25, padding:'5px' }} />
    
  
        <Typography variant="h5" component="div">
          Confirm Delete
        </Typography>
        <Tooltip title="Close">
          <IconButton
            onClick={handleCloseDialog}
            size="small"
            sx={{
              position: 'absolute',
              top: '0px',
              right: '0px',
              zIndex: 1,
            }}
            aria-haspopup="true"
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
      </DialogTitle>
      <DialogContent>
        <Typography  variant="h6" sx={{ textAlign:"center" }}>
          Are you sure you want to delete  <b>{selectedProduct?.title}</b> ?
          <br></br>
          This process cannot be undone.
        </Typography>
      </DialogContent>
      <DialogContent>
        <Card sx={{ display: 'flex', maxWidth: '100%' }}>
          <CardMedia
            component="img"
            alt={selectedProduct?.title || 'Product Image'}
            height="250"
            image={selectedProduct?.images[0] || 'https://via.placeholder.com/150'}
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="h6" component="div">
              {selectedProduct?.title}
            </Typography>
            <Typography variant="h6" component="div">
              #{selectedProduct?.id}
            </Typography>
            <div style={{
                fontSize: '0.875rem',
                color: 'rgba(0, 0, 0, 0.6)',     
                maxWidth: '300px'          
              }}>
                {selectedProduct?.description}
              </div>
            <Typography variant="h6" color="text.primary" sx={{ mt: 2 }}>
              ${selectedProduct?.price?.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleClose}  disableElevation>Cancel</Button>
          <Button onClick={handleDeleteProduct} autoFocus  disableElevation  sx={{ backgroundColor: '#cd3131', color: 'white', '&:hover': { backgroundColor: 'darkred' }}}>
            Delete
          </Button>
        </DialogActions>
    </Dialog>
  );
};

export default DeleteProductDialog;