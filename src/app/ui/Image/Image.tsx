import React, {FC} from 'react';
import noAvailableImage from '../../assets/no-image-available.png'
import {API_SERVER_IMAGES_PATH} from "../../constants/api";
import style from './Image.module.scss'

interface IProps extends React.ImgHTMLAttributes<HTMLImageElement>{
    src: string,
}

export const Image: FC<IProps> = ({src, ...props}) => {
    return (
        <div className={`${style.avatar} ${props.className}`} >
            <img
                src={src ? `${API_SERVER_IMAGES_PATH}${src}` : noAvailableImage}
                alt={"avatar"}
            />
        </div>
    );
};