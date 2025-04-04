import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { ProductInterface, ProductContextType } from "../types/product";
import { CreateProductInput } from "../types/createProductInput";
import { CategoryInterface } from "../types/category";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null);
    const [filterProductsUrl, setFilterProductsUrl] = useState<string | "">("");
    const [categories, setCategories] = useState<CategoryInterface[] | []>([]);
    
    const getProducts = () => {
        return fetch('https://api.escuelajs.co/api/v1/products')
          .then((res) => res.json())
          .then((data) => {   
            setProducts(data);
          })
          .catch((error) => console.error('Error fetching products:', error));
    }
    
    const createProduct = (product: CreateProductInput) => {
        return fetch('https://api.escuelajs.co/api/v1/products/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
    
          })
          .then((res) => res.json())
          .then((data) => {
            if(data.id){
                return getProducts(); 
            }
          })
          .then(() => {
            toast.success("Product created successfully!");
          })
          .catch((error) => {
            toast.error(error|| "Ups something went wrong... ");
          });
    };

        
    const updateProduct = (id:number, product:CreateProductInput)=>{
        return fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
    
        })
        .then((res) => {
            if (res.ok) {
                toast.success("Product updated successfully!")
            }
        })
        .then(() =>{
            return getProducts(); 
        })
        .catch((error) => {
            toast.error(error|| "Ups something went wrong... ");
        });
        
    }

    const deleteProduct = (id: number) => {
        return fetch(`https://api.escuelajs.co/api/v1/products/${id}`,
            {
                method: "DELETE",
            }
        )
        .then((res) => {
            if (res.ok) {
                toast.success("Product deleted successfully!")
            }
        })
        .then(() =>{
            return getProducts(); 
        })
        .catch((error) => {
            toast.error(error|| "Ups something went wrong... ");
        });
    };

    const filterProducts = () =>{
        return fetch(filterProductsUrl)
        .then((res) => res.json())
        .then((data) => {   
          setProducts(data);
        })
        .catch((error) => {
            toast.error(error|| "Ups something went wrong... ");
        });
    }


    useEffect(()=>{
        if(filterProductsUrl){
            filterProducts();
        }
    },[filterProductsUrl])

    const getAllCategories = () =>{
        return fetch('https://api.escuelajs.co/api/v1/categories')
        .then((res) => res.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((error) => console.error('Error fetching products:', error));
    };
    useEffect(() => {
        getAllCategories();
    }, []); 
    return (
        <ProductContext.Provider value={{products, setProducts,filterProductsUrl, setFilterProductsUrl,selectedProduct, setSelectedProduct,categories, setCategories,getProducts,createProduct,updateProduct,deleteProduct,filterProducts,getAllCategories}}>
            {children}
        </ProductContext.Provider>
    )
}

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
      throw new Error("useProductContext error");
    }
    return context;
};