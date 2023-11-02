import React, {FC, useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import style from './Products.module.scss'
import {Image, Input} from "../../ui";
import {IProduct} from "../../models/IProduct";
import {API_SERVER_IMAGES_PATH} from "../../contants/api";
import noAvailableImage from "../../assets/no-image-available.png";

interface IProps{
    onEdit: (product: IProduct) => void,
    onDelete: (id: string) => void,
    queryText: string
}

export const ProductsEditList: FC<IProps> = observer(({onEdit, onDelete, queryText}) => {
    const {productStore} = useContext(Context)

    useEffect(() => {
        productStore.getAll(queryText);
    }, [queryText])

    return (
        <div className={style.editProductsContainer}>

            {(queryText && !productStore.isLoading) && `Результаты поиска "${queryText}":`}
            {(productStore.products.length <= 0 && !productStore.isLoading) && <h4 className={style.notFoundLabel}>Ничего не найдено</h4>}
            {productStore.isLoading && <h4 className={style.notFoundLabel}>Идет загрузка содержимого...</h4>}

            {productStore.products.length > 0 && productStore.products.map(({id, title, description, imageUrl}) =>
                <div className={style.editProductContainer} key={id}>
                    <Image className={style.img} src={imageUrl} />

                    <div className={style.textContainer}>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </div>

                    <div className={style.toolsContainer}>
                        <i onClick={() => onEdit({id, title, description, imageUrl})} className='bx bx-pencil'></i>
                        <i onClick={() => onDelete(id)} className='bx bx-trash'></i>
                    </div>

                </div>
            )}
        </div>
    );
});
