import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-toastify"
import { ProductInterface, ProductContextType } from "../types/product";
import { CreateProductInput } from "../types/createProductInput";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [products, setProducts] = useState<ProductInterface[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null);
    
    const getProducts = () => {
        return fetch('https://api.escuelajs.co/api/v1/products')
          .then((res) => res.json())
          .then((data) => {   
            return data;
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
                getProducts(); 
            }
          })
          .then(() => {
            toast.success("Success!", {
                autoClose: 5000,
                closeOnClick: false,
                position: "top-right",

            });
          })
          .catch((error) => {
            toast.error(error, {
                autoClose: 5000,
                closeOnClick: false,
                position: "top-right",

            });
          });
    };

        
      
    const updateProduct = (id: number) => {
        console.log("update product called!")
    };

    const deleteProduct = (id: number) => {
        console.log("update product called!")
    };

    return (
        <ProductContext.Provider value={{products, setProducts,getProducts,selectedProduct, setSelectedProduct,createProduct,updateProduct,deleteProduct}}>
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