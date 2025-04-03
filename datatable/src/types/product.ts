import { CreateProductInput } from "./createProductInput";
export interface ProductInterface {
    id:number,
    title: string,
    price: number;
    category: { id:number, name: string, image:string[], slug:string }; 
    description: string,
    images: string[];   
}
export type ProductContextType = {
    products: ProductInterface[];
    setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
    selectedProduct: ProductInterface | null;
    setSelectedProduct: (product: ProductInterface | null) => void;
    getProducts: () => Promise<void>;
    createProduct: (product: CreateProductInput) => void;
    updateProduct: (id: number,product: CreateProductInput) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    searchProducts: (term: string) => Promise<void>;
};