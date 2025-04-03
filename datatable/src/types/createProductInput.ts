import { ProductInterface } from "./product";
export interface CreateProductInput {
    title: string;
    price: number;
    categoryId: number;
    description: string;
    images: string[];
}