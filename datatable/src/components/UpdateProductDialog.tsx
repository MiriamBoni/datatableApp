import React, {useState,useEffect} from 'react';
import { useProductContext } from '../context/ProductContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { toast } from 'react-hot-toast';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import SelectCategory from './SelectCategory';

interface UpdateProductDialogProps {
  openUpdateProductDialog: boolean;
  setClose: () => void;
}

const UpdateProductDialog: React.FC<UpdateProductDialogProps> = ({ openUpdateProductDialog, setClose }) => {

  const {selectedProduct, updateProduct} = useProductContext();

  const [title, setTitle] = useState<string | "">("");
  const [description, setDescription] = useState<string | "">("");
  const [price, setPrice] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [images, setImages]=useState<string[]>([]);
   const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(()=>{
    if(selectedProduct){
      setTitle(selectedProduct.title);
      setDescription(selectedProduct.description);
      setPrice(selectedProduct.price);
      setCategoryId(selectedProduct.category.id);
      setImages(selectedProduct.images);
    }
  },[selectedProduct])
  const handleClose = () => {
    setClose();
  };

  const handleCategoryChange =(id:number)=>{
    setCategoryId(id);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!title || !description || !price || !categoryId){
      const error="All fields are mandatory!";
      return toast.error(error);
    }

    const updatedProduct = {
      title: title, 
      description: description,
      price: price,
      images: images, 
      categoryId:categoryId
    }
    
    if (selectedProduct?.id) {
      if (selectedProduct?.id) {
        updateProduct(selectedProduct?.id,updatedProduct)
        .then(()=>{
          handleClose();
        })
      }

    }
   
  };
  return (
    <React.Fragment>
      <Dialog
       fullWidth={true}
        maxWidth="md"
        fullScreen={fullScreen}
        open={openUpdateProductDialog}
        onClose={handleClose}
        disableEscapeKeyDown
      >
         <form onSubmit={handleSubmit}>
          <DialogTitle>Update an existing product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill all the inputs with the information of the product.
            </DialogContentText>
            <Box sx={{display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center',gap: 4, }}>
              <div>
                <img src={images[0]} alt={title}  height='350px' style={{ width: '100%', objectFit: 'cover' }}/>
              </div>
              <div style={{ width: '100%' }}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="title"
                  name="title"
                  label="Product Title"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="outlined-multiline-static"
                  multiline
                  rows={6}
                  name="description"
                  label="Product description"
                  type="textarea"
                  fullWidth
                  variant="standard"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <SelectCategory onChange={handleCategoryChange} selectedCategoryId={categoryId}></SelectCategory>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="price"
                  name="price"
                  label="price"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={price ?? ""}
                  onChange={(e) => setPrice(e.target.value? Number (e.target.value) : null)}
                />
              </div>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button  onClick={handleClose} disableElevation>Cancel</Button>
            <Button variant="contained" type="submit" disableElevation>Save changes</Button>
          </DialogActions>
         </form>
      </Dialog>
    </React.Fragment>
  );
}
export default UpdateProductDialog;