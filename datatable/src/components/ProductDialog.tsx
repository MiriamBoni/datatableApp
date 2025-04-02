import * as React from 'react';
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

interface ProductDialogProps {
  openProductDialog: boolean;
  setClose: () => void;
}

const ProductDialog: React.FC<ProductDialogProps> = ({ openProductDialog, setClose }) => {
  const handleCloseDialog = () => {
    setClose();
  };
  const { selectedProduct } = useProductContext();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <Dialog
      fullScreen={fullScreen}
      open={openProductDialog}
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
        {selectedProduct?.title } 
        <Tooltip title="Close">
          <IconButton
            onClick={handleCloseDialog}
            size="small"
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 1,
            }}
            aria-haspopup="true"
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Tooltip>
      </DialogTitle>
      <DialogContent>
        <Card sx={{ display: 'flex', maxWidth: '100%' }}>
          <CardMedia
            component="img"
            alt={selectedProduct?.title || 'Product Image'}
            height="250"
            image={selectedProduct?.thumbnail || 'https://via.placeholder.com/150'}
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
    
    </Dialog>
  );
};

export default ProductDialog;