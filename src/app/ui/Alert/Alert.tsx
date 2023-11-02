import React, {FC, useContext, useEffect, useRef} from 'react';
import style from './Alert.module.scss'
import Icons from '../../assets/alert'
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

export const Alert: FC = observer(() => {
   // const {isShow, title, type} = useAppSelector(state => state.popup.alert)

    const {popupStore} = useContext(Context)

    const timeout = useRef<NodeJS.Timeout>()

    useEffect(() => {
        if(popupStore.isShow){
            timeout.current = setTimeout(() => popupStore.hide(), 5000);
        }
        return () => clearTimeout(timeout.current);
    }, [popupStore.isShow])

    return (
        <div className={popupStore.isShow ? `${style.container} ${style.show}` : style.container}>
            <div className={`${style.body} ${style[popupStore.type]}`}>
                <img src={Icons[popupStore.type]} className={style.icon} alt={'alert-img'}/>
                <p>{popupStore.title}</p>
                <span className={style.closeBtn} onClick={() => popupStore.hide()}>X</span>
            </div>
        </div>
    );
});