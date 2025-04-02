import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProductInterface, ProductContextType } from "../types/product";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{children:ReactNode}> = ({children})=>{
    const [selectedProduct, setSelectedProduct] = useState<ProductInterface | null>(null);
    
    const createProduct = (newItem: ProductInterface) => {
       console.log("create product called!")
    };
    
      
    const updateProduct = (id: number) => {
        console.log("update product called!")
    };

    const deleteProduct = (id: number) => {
        console.log("update product called!")
    };

    return (
        <ProductContext.Provider value={{selectedProduct, setSelectedProduct,createProduct,updateProduct,deleteProduct}}>
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