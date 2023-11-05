import React, {FC, useContext, useEffect, useState} from 'react';
import style from './AdminLogin.module.scss'
import {Button, Form, Input} from "../../ui";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {Link, useNavigate} from "react-router-dom";
import {ADMIN_PAGE_ROUTE} from "../../constants/routes";
import {isCorrectEmail, isRequiredField} from "../../utils/validation-templates";

export const AdminLogin: FC = observer(() => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const navigate = useNavigate()

    const {authStore} = useContext(Context)

    useEffect(() => {
      if(authStore.isAuth) navigate(ADMIN_PAGE_ROUTE)
    }, [authStore.isAuth])

    const submitCheckEmail = async () => {
        authStore.checkEmail(email)
    }

    const submitLogin = async () => {
        authStore.login(email, password)
    }

    return (
        <div className={style.wrapper}>
            <h2>Вход в систему администрирования</h2>
            {!authStore.isTrustEmail ?
                <Form onSubmit={submitCheckEmail}>
                    <div className={style.form}>
                        <Input
                            placeholder="Введите адрес электронной почты..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Button loading={authStore.isLoading} type="submit">Отправить письмо с паролем</Button>
                    </div>

                </Form>
                :
                <Form onSubmit={submitLogin}>
                    <div className={style.form}>
                        <h4>{`На адрес электронной почты "${email}" отправлено письмо с паролем. Введите его в поле ниже:`}</h4>
                        <Input
                            placeholder="Введите пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type={'password'}
                        />
                        <Button loading={authStore.isLoading} type="submit">Войти</Button>
                    </div>
                </Form>
            }
        </div>
    );
});