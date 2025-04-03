import React, {useState,useEffect} from 'react';
import { useProductContext } from '../context/ProductContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify"
import SelectCategory from './SelectCategory';

export default function CreateProductDialog() {
  const defaultImageUrl = "https://karanzi.websites.co.in/obaju-turquoise/img/product-placeholder.png";

  const {createProduct} = useProductContext();
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState<string | "">("");
  const [description, setDescription] = useState<string | "">("");
  const [price, setPrice] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [images, setImages]=useState<string[]>([defaultImageUrl]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCategoryChange =(id:number)=>{
    setCategoryId(id);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!title || !description || !price || !categoryId){
      const error="All fields are mandatory!";
      return toast.error(error, {
                autoClose: 9000,
                closeOnClick: false,
                position: "top-right",

              });
    }

    const productData = {
        title: title,
        description: description,
        price: price,
        categoryId: categoryId,
        images: images,
    };
    await createProduct(productData);

    handleClose();
    
  };
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
         <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new product</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill all the inputs with the information of the product.
            </DialogContentText>
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
              id="description"
              name="description"
              label="Product description"
              type="textarea"
              fullWidth
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <SelectCategory onChange={handleCategoryChange}></SelectCategory>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
         </form>
      </Dialog>
    </React.Fragment>
  );
}