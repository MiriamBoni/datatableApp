import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App'
import ContextProvider from './context/ContextProvider';

const mount = (el: HTMLElement): void => {
    const root = ReactDom.createRoot(el);
    root.render(

            <ContextProvider>
                <App/>
            </ContextProvider>
        
    );
};
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_datatable-dev-root');
    if (devRoot && devRoot instanceof HTMLElement) {
        mount(devRoot);
    }
     
}
  
export { mount };
