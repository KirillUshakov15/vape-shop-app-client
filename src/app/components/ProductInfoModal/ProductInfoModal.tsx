import React, {FC, useContext} from 'react';
import {Modal} from "../../ui/Modal";
import {PRODUCT_INFO_MODAL} from "../../constants/modal-names";
import {IProduct} from "../../models/IProduct";
import {Button, Divider, Image} from "../../ui";
import style from "./ProductInfoModal.module.scss"

interface IProps{
    product: IProduct | null
}

export const ProductInfoModal: FC<IProps> = ({product}) => {

    return (
        <Modal modalName={PRODUCT_INFO_MODAL} title="Описание">
            {product &&
                <div className={style.container}>
                    <Image src={product.imageUrl}/>
                    <div className={style.titleContainer}>
                        <h1>{product.title}</h1>
                    </div>
                    <p>{product.description}</p>
                </div>
            }
        </Modal>
    );
};