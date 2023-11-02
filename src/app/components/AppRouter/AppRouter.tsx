import React, {FC, useContext, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateRoutes, routes} from "./routes";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {PageSpinner} from "../PageSpinner";

export const AppRouter: FC = observer(() => {

    const {authStore} = useContext(Context)

    return (
        <Suspense fallback={<PageSpinner/>}>
            <Routes>
                {routes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}

                {authStore.isAuth && privateRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>}/>
                )}
            </Routes>
        </Suspense>

    );
});