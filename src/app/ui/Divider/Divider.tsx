import React, {FC} from 'react';
import style from './Divider.module.scss'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Divider: FC<IProps> = ({...props}) => {
    return (
        <div {...props} className={`${style.divider} ${props.className}`} >
            <div className={style.shadow}/>
        </div>
    );
};