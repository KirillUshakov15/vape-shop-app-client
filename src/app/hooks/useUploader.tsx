import React, {useMemo, useRef} from "react";

export type FileType = 'image/*'

export default function (fileType: FileType, file: any, setFile: Function){

    const inputRef = useRef<HTMLInputElement>(null);

    const uploaderClick = () => {
        if(inputRef.current){
            inputRef.current.click();
        }
    }

    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setFile(e.target.files[0])
        }
    }

    const removeFile = () => {
        setFile(null);
    }

    const FileInput = () => useMemo<JSX.Element>(() => {
        return (
            <input style={{display: 'none'}} accept={fileType} ref={inputRef} type="file" onChange={uploadFile}/>
        )
    }, [])

    return {
        uploaderClick,
        uploadFile,
        removeFile,
        FileInput
    }
}