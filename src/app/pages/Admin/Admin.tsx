import React, {ChangeEvent, FC, useContext, useEffect, useState} from 'react';
import style from './Admin.module.scss'
import {Button, Divider, Input} from "../../ui";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {CREATE_PRODUCT_MODAL, DELETE_PRODUCT_MODAL} from "../../contants/modal-names";
import {EditProductModal} from "../../components";
import {ProductsEditList} from "../../components/Products";
import {IProduct} from "../../models/IProduct";
import {DeleteProductModal} from "../../components/ConfirmModal";
import useSearch from "../../hooks/useSearch";
import {useNavigate} from "react-router-dom";
import {ADMIN_LOGIN_PAGE_ROUTE, MAIN_PAGE_ROUTE} from "../../contants/routes";

export const Admin: FC = observer(() => {
    const [editableProduct, setEditableProduct] = useState<IProduct | null>(null)
    const [deleteID, setDeleteID] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const navigate = useNavigate()
    const searchValue = useSearch<string>(value)

    const {popupStore, authStore} = useContext(Context)

    const logout = async () => {
        console.log('logout')
        await authStore.logout()
        navigate(MAIN_PAGE_ROUTE)
    }

    const openCreateProductModal = () => {
        setEditableProduct(null)
        popupStore.open(CREATE_PRODUCT_MODAL)
    }

    const openEditProductModal = (product: IProduct) => {
        setEditableProduct(product)
        popupStore.open(CREATE_PRODUCT_MODAL)
    }

    const deleteProduct = (id: string) => {
        setDeleteID(id)
        popupStore.open(DELETE_PRODUCT_MODAL)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <div className={style.wrapper}>

            <h1>Редактирование товаров</h1>

            <Button onClick={openCreateProductModal}>
                <i className='bx bx-list-plus'></i>
                Добавить новый товар
            </Button>

            <Divider/>
            <Input value={value} onChange={handleChange} className={style.searchInput} placeholder="Поиск..."/>

            <ProductsEditList queryText={searchValue} onEdit={openEditProductModal} onDelete={deleteProduct}/>

            <Divider/>

            <Button onClick={logout}>
                <i className='bx bx-exit'></i>
                Выход
            </Button>

            {popupStore.isOpen && <EditProductModal editableProduct={editableProduct}/>}
            {popupStore.isOpen && <DeleteProductModal deletedProductID={deleteID}/>}
        </div>
    );
});