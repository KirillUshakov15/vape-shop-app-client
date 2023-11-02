import React, {FC} from 'react';
import './Textarea.module.scss'

type TextareaProps = React.InputHTMLAttributes<HTMLTextAreaElement>

export const Textarea: FC<TextareaProps> = ({...props}) => {
    return (
        <textarea {...props} />
    );
};