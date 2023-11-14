import {popupStore} from "../../index";

export default (e: any) => {
    if(e?.response?.data?.message)
        popupStore.show(e?.response?.data?.message, 'ERROR')
    else
        popupStore.show("На сервере возникла непредвиденная ошибка", 'ERROR')
}