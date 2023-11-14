import React, {FC, useContext, useEffect} from "react";
import useValidation from "./useValidation";
import {FormContext} from "../Form";
import {ValidationTypes} from "./validation-types";

export interface IRule {
    type: ValidationTypes,
    message: string,
    value?: string | number | RegExp
}

interface IFormItemProps {
    name?: string;
    children: JSX.Element,
    rules: IRule[]
}

export const FormValidator: FC<IFormItemProps> = ({children, name, rules}) => {
    const {value} = children.props;
    const {validation, setValidation} = useContext(FormContext)
    const {errors, isDirty, validateFields, ErrorLabel} = useValidation()

    useEffect(() => {
        validateFields(value, rules, validation.allFields);
    }, [value, validation.allFields])

    useEffect(() => {
        if(!validation.allFields) return
        if(errors.length > 0) {
            setValidation({...validation, allFields: false, success: false})
        }
        if(errors.length <= 0 && validation.allFields) setValidation({...validation, success: true})
    }, [errors])

    if(isDirty && errors.length > 0){
        children = React.cloneElement(children, {style: {borderColor: "red"}})
    }

    return (
        <>
            {children}
            <ErrorLabel/>
        </>
    );
}