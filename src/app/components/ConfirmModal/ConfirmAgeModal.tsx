import React, {FC} from 'react';
import {Button} from "../../ui";
import {Modal} from "../../ui/Modal";
import style from './ConfirmModal.module.scss'
import {CONFIRM_AGE_MODAL} from "../../contants/modal-names";
import {Link, useNavigate} from "react-router-dom";

interface IProps {
    onConfirmed: () => void,
}

export const ConfirmAgeModal: FC<IProps> = ({
                                                onConfirmed
                                            }) => {

    const navigate = useNavigate();

    return (
        <Modal modalName={CONFIRM_AGE_MODAL} title="Подтверждение возраста" closable={false}>
            <div className={style.wrapper}>
                <h2>Данный сайт доступен лицам, достигшим возраста 18 лет</h2>
                <h3>Вам уже исполнилось 18 лет?</h3>
                <div className={style.buttonsContainer}>
                    <Button onClick={onConfirmed}>Да</Button>
                    <Link to={"https://ya.ru"}>
                        <Button>Нет</Button>
                    </Link>

                </div>
            </div>
        </Modal>
    );
};