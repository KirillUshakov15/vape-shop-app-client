import {IProduct} from "../models/IProduct";
import {popupStore} from "../../index";
import {ProductService} from "../services/product-service";
import {action, makeAutoObservable, observable} from "mobx";

export class ProductStore{
    isLoading: boolean = false
    products: IProduct[] = []

    private clearProducts(){
        this.products = []
    }

    private addProducts(products: IProduct[]){
        this.products = [...this.products, ...products]
    }

    private updateProducts(product: IProduct){
        const index = this.products.indexOf(this.products.find(el => el.id === product.id)!);
        this.products.splice(index, 1, product)
        this.products = [...this.products]
    }

    private deleteProduct(id: string){
        this.products = this.products.filter(product => { return product.id !== id})
    }

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(bool: boolean){
        this.isLoading = bool
    }

    async create(data: any){
        try{
            this.setLoading(true)
            const response = await ProductService.create(data)
            this.addProducts([response.data])
            popupStore.close()
            popupStore.show('Товар успешно создан', 'SUCCESS')
            this.setLoading(false)
        }
        catch (e: any) {
            popupStore.show(e?.response?.data?.message, 'ERROR')
            this.setLoading(false)
        }
    }

    async getAll(searchText?: string){
        try{
            this.setLoading(true)
            this.clearProducts()
            const {data} = await ProductService.getAll(searchText)
            this.addProducts([...data])
            this.setLoading(false)
        }
        catch (e: any) {
            popupStore.show(e?.response?.data?.message, 'ERROR')
            this.setLoading(false)
        }
    }

    async edit(data: any){
        try{
            this.setLoading(true)
            const response = await ProductService.edit(data)
            this.updateProducts(response.data)
            //await this.getAll()
            popupStore.close()
            popupStore.show('Товар успешно отредактирован', 'SUCCESS')
            this.setLoading(false)
        }
        catch (e: any) {
            popupStore.show(e?.response?.data?.message, 'ERROR')
            this.setLoading(false)
        }
    }

    async delete(id: string){
        try{
            this.setLoading(true)
            await ProductService.delete(id)
            this.deleteProduct(id)
            popupStore.close()
            popupStore.show('Товар успешно удален', 'SUCCESS')
            this.setLoading(false)
        }
        catch (e: any) {
            popupStore.show(e?.response?.data?.message, 'ERROR')
            this.setLoading(false)
        }
    }
}