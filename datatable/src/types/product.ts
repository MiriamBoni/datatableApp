export interface ProductInterface {
    id:number,
    title: string,
    price: number;
    category: { name: string }; 
    thumbnail: string;
    description: string,
    images: string[];   
}
export type ProductContextType = {
    selectedProduct: ProductInterface | null;
    setSelectedProduct: (product: ProductInterface | null) => void;
    // products: ProductInterface[];
    createProduct: (product: ProductInterface) => void;
    updateProduct: (id: number) => void;
    deleteProduct: (id: number) => void;
};