import React, {FC, useContext, useEffect} from 'react';
import appLogo from '../../assets/logotype.png'
import './Layout.module.scss'
import style from './Layout.module.scss'
import {AppRouter} from "../AppRouter";
import {Link, useLocation} from "react-router-dom";
import {MAIN_PAGE_ROUTE} from "../../contants/routes";
import {Alert} from "../../ui";
import {Context} from "../../../index";

export const Layout: FC = () => {

    const location = useLocation()

    const isMainPage = location.pathname === MAIN_PAGE_ROUTE

    return (
        <div className={isMainPage ? `${style.wrapperMainPage}` : `${style.wrapper}`}>
            <header className={style.header}>
                <Link to={MAIN_PAGE_ROUTE}>
                    <img src={appLogo} alt='logo'/>
                </Link>
                <Alert/>
            </header>

            <div className={style.body}>
                <AppRouter/>
            </div>
        </div>
    );
};
