import React, {FC} from 'react';
import style from './NotFoundPage.module.scss'
import {Button} from "../../ui";
import {Link} from "react-router-dom";
import {MAIN_PAGE_ROUTE} from "../../contants/routes";

export const NotFound: FC = () => {
    return (
        <div className={style.wrapper}>
            <div>
                <h1>404</h1>
                <h2>Ничего не найдено</h2>
                <p>Запрашиваемая Вами страница не найдена</p>
                <div className={style.buttonContainer}>
                    <Link to={MAIN_PAGE_ROUTE}>
                        <Button>Вернуться на главную</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};