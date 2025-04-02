
import React, { ReactNode } from "react";
import { ProductProvider } from "./ProductContext";

interface ProviderProps {
    children: ReactNode;
}

const ContextProvider: React.FC<ProviderProps> = ({children}) =>{
    return (
        <ProductProvider>
            {children}
        </ProductProvider>
    )
}
export default ContextProvider;
// I know Im only using 1 context (ProductContext), but still I wanted to wrap it in
// this Context Provider to prevent "Context hell" (in case the app grows) :)