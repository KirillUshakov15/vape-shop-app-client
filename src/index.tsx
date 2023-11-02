import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import {BrowserRouter} from "react-router-dom";
import {AuthStore} from "./app/store/auth-store";
import {PopupStore} from "./app/store/popup-store";
import {ProductStore} from "./app/store/product-store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interface State {
    authStore: AuthStore,
    popupStore: PopupStore,
    productStore: ProductStore
}

export const authStore = new AuthStore();
export const popupStore = new PopupStore();
export const productStore = new ProductStore()

export const Context = createContext<State>({
    authStore,
    popupStore,
    productStore
})

root.render(
    <BrowserRouter>
        <Context.Provider value={{authStore, popupStore, productStore}}>
            <App/>
        </Context.Provider>
    </BrowserRouter>
);
