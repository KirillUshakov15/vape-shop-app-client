import React, {FC, useContext, useEffect, useState} from 'react';
import style from './Modal.module.scss'
import {Divider} from "../Divider";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";

interface IModalProps {
    modalName: string,
    children?: React.ReactNode
    closable?: boolean
    title?: string | undefined,
    onClose?: () => void,
    className?: string
}

export const Modal: FC<IModalProps> = observer(({
                                           modalName,
                                           closable = true,
                                           title,
                                           children,
                                           onClose,
                                           className
}) => {

    const {popupStore} = useContext(Context)

    const modalClose = () => {
        if(closable){
            popupStore.close()
            if(onClose) onClose();
        }
    }

    const isRightName = modalName === popupStore.name;

    return (
        <div className={(isRightName && popupStore.isOpen) ? `${style.modal} ${style.modalActive}`: style.modal} onClick={modalClose}>
            <div className={`${style.modalBody} ${className}`} onClick={e => e.stopPropagation()}>
                <div className={style.modalHeader}>
                    <h4>{title}</h4>
                    <span className={!closable ? `${style.displayNone}` : undefined} onClick={modalClose}>X</span>
                </div>
                {title && <Divider className={style.divider}/>}
                <div className={style.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
});
