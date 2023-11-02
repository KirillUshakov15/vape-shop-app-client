import React, {FC} from 'react';
import {IProduct} from "../../models/IProduct";
import {Button, Image} from "../../ui";
import style from './Products.module.scss'

interface IProps{
    product: IProduct,
    onMore: (product: IProduct) => void
}

export const Product: FC<IProps> = ({product, onMore}) => {
    return (
        <div className={style.productContainer}>
            <Image className={style.avatar} src={product.imageUrl} />
            <div className={style.titleContainer}>
                <h1>{product.title}</h1>
            </div>
            <Button onClick={() => onMore(product)}>Подробнее</Button>
        </div>
    );
};