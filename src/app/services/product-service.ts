import {IProduct} from "../models/IProduct";
import $api from "../api";
import {CREATE_PRODUCT, EDIT_PRODUCT, GET_ALL_PRODUCTS} from "../constants/api";
import {AxiosResponse} from "axios";

export class ProductService{
    static async create(data: IProduct): Promise<AxiosResponse<IProduct>>{
        return await $api.post(CREATE_PRODUCT, data)
    }

    static async getAll(searchText?: string): Promise<AxiosResponse<IProduct[]>>{
        console.log(searchText)
        return await $api.get(GET_ALL_PRODUCTS, {params: {
            searchText: searchText
        }})
    }

    static async edit(editProduct: IProduct): Promise<AxiosResponse<IProduct>>{
        return await $api.patch(EDIT_PRODUCT, editProduct);
    }

    static async delete(id: string){
        return await $api.delete('/product/' + id)
    }
}