import { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
interface Filters{
    title?: string,
    categoryId?: number,
    price_min?: string,
    price_max?: string
}

const useFilterProducts = () =>{
    let filterProducstUrl="https://api.escuelajs.co/api/v1/products/"
    let params = new URLSearchParams();
    const [filters,setFilters] = useState<Filters>({});
    const {setFilterProductsUrl} = useProductContext();

    const concatFilters = (key: keyof Filters, value:string) =>{
        setFilters((prev)=>({...prev,[key]:value||""}))
    };
    
    useEffect(() => {
        Object.entries(filters).forEach(([key,value])=>{
            if(value){
                params.append(key,value)
            }
        })

        let urlWithFilterParams=`${filterProducstUrl}?${params.toString()}`;
        setFilterProductsUrl(urlWithFilterParams);
    },[filters])

    return { concatFilters };
};

export default useFilterProducts;