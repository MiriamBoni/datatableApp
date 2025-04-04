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
      fullWidth={true}
      maxWidth="md"
      fullScreen={fullScreen}
      open={openProductDialog}
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
        Product description
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
        <Card className='productCard' sx={{ display: 'flex',flexDirection: { xs: 'column', sm: 'row' }, maxWidth: '100%' }}>
              <div>
                <img src={selectedProduct?.images[0] }  alt={selectedProduct?.title || 'Product Image'}  height='350px' style={{ width: '100%', objectFit: 'cover', borderRadius:'10px' }}/>
              </div>
          <CardContent sx={{ flex: '1 0 auto' }}>
              <div style={{
                maxWidth: '300px',
                fontWeight: 500, 
                }}>
                ID #{selectedProduct?.id}
              </div>
            <Typography className="fieldPaddings" variant="h6" component="div">
              {selectedProduct?.title}
            </Typography>
            <div className="fieldPaddings" style={{
               maxWidth: '300px',
               fontWeight: 500,  
              }}>
                {selectedProduct?.category?.name}
              </div>
          
            <div className="fieldPaddings" style={{
                fontSize: '0.875rem',
                maxWidth: '500px'          
              }}>
                {selectedProduct?.description}
              </div>
            <Typography className="fieldPaddings" variant="h6"  sx={{ mt: 2 }}>
              ${selectedProduct?.price?.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
    
    </Dialog>
  );
};

export default ProductDialog;