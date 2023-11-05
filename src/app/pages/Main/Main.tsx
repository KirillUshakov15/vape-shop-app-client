import React, {FC, useContext} from 'react';
import style from './Main.module.scss'
import {Button, Divider} from "../../ui";
import {Link} from "react-router-dom";
import {INSTAGRAM_ROUTE, MAIN_PAGE_ROUTE, PRODUCTS_PAGE_ROUTE} from "../../constants/routes";
import {Context} from "../../../index";
import {RequestModal} from "../../components";
import {REQUEST_MODAL} from "../../constants/modal-names";
import {observer} from "mobx-react-lite";

export const Main: FC = observer(() => {

    const {popupStore} = useContext(Context)

    return (
        <div className={style.wrapper}>

            <div className={style.buttonsContainer}>
                <Link to={PRODUCTS_PAGE_ROUTE}>
                    <Button>
                        <i className='bx bx-list-ul'></i>
                        Линейка товаров
                    </Button>
                </Link>
                <Link to={INSTAGRAM_ROUTE}>
                    <Button>
                        <i className='bx bxl-instagram'></i>
                        Инстаграм
                    </Button>
                </Link>
                <Button onClick={() => popupStore.open(REQUEST_MODAL)}>
                    <i className='bx bx-purchase-tag-alt'></i>
                    Прайс лист
                </Button>
            </div>

            {popupStore.isOpen && <RequestModal/>}
        </div>
    );
});