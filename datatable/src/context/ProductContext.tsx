import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from 'react-hot-toast';
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

    const searchProducts = (term:string) =>{
        return fetch(`https://api.escuelajs.co/api/v1/products/?title=${term}`)
        .then((res) => res.json())
        .then((data) => {   
          setProducts(data);
        })
        .catch((error) => {
            toast.error(error|| "Ups something went wrong... ");
        });
    }
    return (
        <ProductContext.Provider value={{products, setProducts,getProducts,selectedProduct, setSelectedProduct,createProduct,updateProduct,deleteProduct,searchProducts}}>
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