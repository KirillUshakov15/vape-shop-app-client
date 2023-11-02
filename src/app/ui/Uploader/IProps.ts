import {FileType} from "../../hooks/useUploader";

export interface IProps{
    file: any,
    setFile: Function,
    fileType: FileType
}