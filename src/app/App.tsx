import React, {useContext, useEffect, useState} from 'react';
import './App.module.scss'
import {ConfirmAgeModal, Layout} from "./components";
import {Modal} from "./ui/Modal";
import {Button} from "./ui";
import {Context} from "../index";
import {CONFIRM_AGE_MODAL} from "./contants/modal-names";

function App() {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [ageConfirmed, setAgeConfirmed] = useState(false)

    const {authStore, popupStore} = useContext(Context)

    useEffect(() => {
        !localStorage.getItem('ageConfirm') ? popupStore.open(CONFIRM_AGE_MODAL) : confirmAge()
    }, [])

    const confirmAge = () => {
        setAgeConfirmed(true)
        localStorage.setItem('ageConfirm', "true")
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            authStore.refreshAccess()
        }
    }, [])

    return (
        <>
            {ageConfirmed ?
                <Layout/>
            :
                <ConfirmAgeModal
                    onConfirmed={confirmAge}
                />
            }
        </>
    );
}

export default App;
