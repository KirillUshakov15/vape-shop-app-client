import React, {FC, useContext} from 'react';
import {Modal} from "../../ui/Modal";
import {PRODUCT_INFO_MODAL} from "../../contants/modal-names";
import {IProduct} from "../../models/IProduct";
import {Button, Divider, Image} from "../../ui";
import style from "./ProductInfoModal.module.scss"
import {Context} from "../../../index";

interface IProps{
    product: IProduct | null
}

export const ProductInfoModal: FC<IProps> = ({product}) => {

    const {popupStore} = useContext(Context)

    return (
        <Modal modalName={PRODUCT_INFO_MODAL} title="Описание">
            {product &&
                <div className={style.container}>
                    <Image src={product.imageUrl}/>
                    <div className={style.titleContainer}>
                        <h1>{product.title}</h1>
                    </div>

                    <Divider className={style.divider}/>
                    <p>{product.description}</p>
                    <Button onClick={() => popupStore.close()}>Назад</Button>
                </div>
            }
        </Modal>
    );
};