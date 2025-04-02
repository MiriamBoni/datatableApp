import {mount} from 'datatable/DatatableApp';
import React,{useRef,useEffect} from 'react';
export default () =>{
    const ref=useRef <HTMLDivElement | null>(null);
    useEffect(() => {
        if (ref.current) {
            mount(ref.current);
        }
    }, []);
    return <div ref={ref}></div>;

}