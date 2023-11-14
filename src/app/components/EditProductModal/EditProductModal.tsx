import React, {FC, useContext, useEffect, useState} from 'react';
import {Modal} from "../../ui/Modal";
import {CREATE_PRODUCT_MODAL} from "../../constants/modal-names";
import {Button, Form, Input, Textarea} from "../../ui";
import {Uploader} from "../../ui/Uploader";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {IProduct} from "../../models/IProduct";
import {isRequiredField} from "../../utils/validation-templates";
import style from '../../pages/Admin/Admin.module.scss'

interface IProps{
    editableProduct: IProduct | null
}

export const EditProductModal: FC<IProps> = observer(({editableProduct}) => {

    const [image, setImage] = useState(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const {productStore} = useContext(Context)

    useEffect(() => {
        if(editableProduct){
            setTitle(editableProduct.title)
            setDescription(editableProduct.description)
        }
    }, [])

    const submit = () => {
        const formData = new FormData()
        if(editableProduct) formData.append('id', editableProduct.id);
        formData.append('title', title)
        formData.append('description', description)
        if(image) formData.append('image', image)

        editableProduct
            ? productStore.edit(formData)
            : productStore.create(formData)
    }

    return (
        <Modal
            modalName={CREATE_PRODUCT_MODAL}
            title={editableProduct ? "Редактирование товара" : "Создание нового товара"} >
            <Form onSubmit={submit} validate={true}>

                <Form.Validator rules={[isRequiredField]}>
                    <Input
                        placeholder="Введите название товара..."
                        value={title || ''}
                        onChange={e => setTitle(e.target.value)}
                    />
                </Form.Validator>

                <Form.Validator rules={[isRequiredField]}>
                    <Textarea
                        placeholder="Укажите описание товара..."
                        value={description || ''}
                        onChange={e => setDescription(e.target.value)}
                    />
                </Form.Validator>

                <div className={style.buttonsContainer}>
                    <Uploader
                        title="Загрузите изображение"
                        file={image}
                        setFile={setImage}
                        fileType="image/*"
                    />
                    <Button loading={productStore.isLoading} type="submit">
                        {editableProduct ? "Редактировать" : "Добавить"}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
});