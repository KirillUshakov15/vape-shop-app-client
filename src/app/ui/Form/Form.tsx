import React, {
    Children,
    createContext,
    FC, useCallback, useEffect, useMemo, useRef,
    useState
} from 'react';
import {FormValidator} from "./FormValidator/FormValidator";
import useValidation from "./FormValidator/useValidation";

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement>{
    children: React.ReactNode
    validate?: boolean;
    onSubmit: () => void;
}

interface FormExtensions{
    Validator: typeof FormValidator
}

interface IValidation {
    allFields: boolean,
    success: boolean
}

const validationInitialState = {
    allFields: false,
    success: false
}

interface IValidationContextExtension {
    validation: IValidation,
    setValidation: React.Dispatch<React.SetStateAction<IValidation>>,
}

export const FormContext = createContext<IValidationContextExtension>({
    validation: validationInitialState,
    setValidation: () => {}
})

export const Form: FC<IFormProps> & FormExtensions = ({children, validate= false, onSubmit, ...props}) => {
    const [validation, setValidation] = useState<IValidation>(validationInitialState)

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        validate
            ? validateForm()
            : onSubmit()
    }
    useEffect(() => {
        if(validation.success && validation.allFields){
            onSubmit();
        }
    }, [validation.success])

    const validateForm = async () => {
        setValidation({...validation, allFields: true})
    }

    return (
        <FormContext.Provider value={{validation, setValidation}}>
            <form {...props} onSubmit={submit}>
                {children}
            </form>
        </FormContext.Provider>
    );
};

Form.Validator = FormValidator;