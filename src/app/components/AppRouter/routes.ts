import React, {FC} from "react";
import {Main} from "../../pages";
import {MAIN_PAGE_ROUTE, PRODUCTS_PAGE_ROUTE, ADMIN_LOGIN_PAGE_ROUTE, ADMIN_PAGE_ROUTE} from "../../contants/routes";

interface IRoute {
    path: string,
    Component: FC
}

const NotFound = React.lazy(() => import('../../pages/NotFound'))
const Goods = React.lazy(() => import('../../pages/Products'))
const AdminLogin = React.lazy(() => import('../../pages/AdminLogin'))
const Admin = React.lazy(() => import('../../pages/Admin'))

export const routes: IRoute[] = [
    {path: MAIN_PAGE_ROUTE, Component: Main},
    {path: PRODUCTS_PAGE_ROUTE, Component: Goods},
    {path: ADMIN_LOGIN_PAGE_ROUTE, Component: AdminLogin},
    {path: '*', Component: NotFound}
]

export const privateRoutes: IRoute[] = [
    {path: ADMIN_PAGE_ROUTE, Component: Admin},
]