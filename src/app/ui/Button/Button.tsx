import React, {FC} from "react";
import './Button.module.scss';
import {Spinner} from "../Spinner";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode;
    loading?: boolean
}

export const Button: FC<IProps> = ({
                                       children,
                                       loading,
                                       ...props
                                   }) => {
    return (
        <button {...props} disabled={loading || props.disabled}>
            {loading && <Spinner/>}
            {children}
        </button>
    );
};