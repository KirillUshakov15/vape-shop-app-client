import React, {FC, useContext, useState} from 'react';
import {Modal} from "../../ui/Modal";
import {REQUEST_MODAL} from "../../constants/modal-names";
import {Button, Form, Input} from "../../ui";
import style from './RequestModal.module.scss'
import {IProduct} from "../../models/IProduct";
import {IPartnership} from "../../models/IPartnership";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {isCorrectEmail, isCorrectPhoneNumber, isRequiredField} from "../../utils/validation-templates";

const initialState: IPartnership = {
    name: '',
    email: '',
    phoneNumber: ''
}

export const RequestModal: FC = observer(() => {
    const [data, setData] = useState<IPartnership>(initialState)

    const {authStore} = useContext(Context)

    const submit = () => {
        authStore.sendPartnershipRequest(data);
    }

    return (
        <Modal modalName={REQUEST_MODAL} title="Заявка">
            <Form onSubmit={submit} validate={true}>
                <div className={style.wrapper}>
                    <h3>Заявка на сотрудничество</h3>
                    <p>Оставьте свои контактные данные, и наши представители свяжутся с Вами в ближайшее время</p>

                    <Form.Validator name="name" rules={[isRequiredField]}>
                        <Input
                            placeholder="Укажите свое имя..."
                            value={data.name || ''}
                            onChange={e => setData({...data, name: e.target.value})}
                        />
                    </Form.Validator>

                    <Form.Validator name="email" rules={[...isCorrectEmail]}>
                        <Input
                            placeholder="Укажите E-mail..."
                            value={data.email || ''}
                            onChange={e => setData({...data, email: e.target.value})}
                        />
                    </Form.Validator>

                    <Form.Validator name="phoneNumber" rules={[...isCorrectPhoneNumber]}>
                        <Input
                            placeholder="Укажите номер телефона..."
                            value={data.phoneNumber || ''}
                            onChange={e => setData({...data, phoneNumber: e.target.value})}
                        />
                    </Form.Validator>
                    <Button loading={authStore.isLoading} type="submit">Отправить заявку</Button>
                </div>
            </Form>
        </Modal>
    );
});