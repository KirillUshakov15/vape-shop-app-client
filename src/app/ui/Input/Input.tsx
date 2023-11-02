import React, {FC, useState} from 'react';
import style from './Input.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

interface InputExtensions{
    Password: typeof InputPassword,
    Search: typeof InputSearch
}

export const Input: FC<InputProps> & InputExtensions = ({...props}) => {
    return (
        <input {...props} className={`${style.input} ${props.className}`}  />
    );
};

const InputPassword: FC<InputProps> = ({...props}) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(prevState => !prevState)
    }

    return (
        <div className={style.password_container}>
            <Input type={visible ? 'text' : 'password'} {...props} />
            {/*<img onClick={toggleVisibility} src={visible ? icon.hide : icon.show} alt={'password-icon'}/>*/}
        </div>
    )
}

const InputSearch: FC<InputProps> = ({...props}) => {
    return (
        <div className={style.searchContainer}>
            <Input {...props}/>
            <i className='bx bx-search-alt-2'></i>
        </div>
    )
}

Input.Password = InputPassword
Input.Search = InputSearch