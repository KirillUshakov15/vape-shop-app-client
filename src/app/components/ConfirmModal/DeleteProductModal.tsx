import React, {FC, useContext} from 'react';
import {Modal} from "../../ui/Modal";
import {DELETE_PRODUCT_MODAL} from "../../contants/modal-names";
import style from "./ConfirmModal.module.scss";
import {Button} from "../../ui";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

interface IProps{
    deletedProductID: string
}

export const DeleteProductModal: FC<IProps> = observer(({deletedProductID}) => {
    const {productStore, popupStore} = useContext(Context)

    return (
        <Modal modalName={DELETE_PRODUCT_MODAL} title="Удаление товара">
            <div className={style.wrapper}>
                <h3>Вы действительно хотите удалить этот товар?</h3>
                <div className={style.buttonsContainer}>
                    <Button onClick={() => productStore.delete(deletedProductID)}>Да</Button>
                    <Button onClick={() => popupStore.close()}>Нет</Button>
                </div>
            </div>
        </Modal>
    );
});