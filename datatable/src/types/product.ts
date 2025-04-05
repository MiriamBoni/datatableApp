import { CreateProductInput } from "./createProductInput";
import { CategoryInterface } from "./category";
export interface ProductInterface {
    id:number,
    title: string,
    price: number;
    category: { id:number, name: string, image:string[], slug:string }; 
    description: string,
    images: string[];   
}
export type ProductContextType = {
    loadingProducts: Boolean;
    totalProducts: number;
    setTotalProducts:React.Dispatch<React.SetStateAction<number>>;
    setLoadingProducts: React.Dispatch<React.SetStateAction<Boolean>>;
    products: ProductInterface[];
    setProducts: React.Dispatch<React.SetStateAction<ProductInterface[]>>;
    selectedProduct: ProductInterface | null;
    setSelectedProduct: (product: ProductInterface | null) => void;
    filterProductsUrl: string;
    setFilterProductsUrl: React.Dispatch<React.SetStateAction<string>>;
    categories: CategoryInterface[];
    setCategories: React.Dispatch<React.SetStateAction<CategoryInterface[]>>;
    getProducts: (offset?:number, limit?:number) => Promise<void>;
    createProduct: (product: CreateProductInput) => void;
    updateProduct: (id: number,product: CreateProductInput) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    filterProducts: () => Promise<void>;
    getAllCategories:() => Promise<void>;
};