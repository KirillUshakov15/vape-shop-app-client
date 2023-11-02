import {makeAutoObservable} from "mobx";

export type AlertType = "WARNING" | "ERROR" | "SUCCESS" | "INFO"

export class PopupStore{
    isShow: boolean = false
    title: string = ''
    type: AlertType = "INFO"

    isOpen: boolean = false
    name: string = ''

    constructor() {
        makeAutoObservable(this);
    }

    show(title: string, type: AlertType){
        this.isShow = true;
        this.title = title
        this.type = type
    }

    hide(){
        this.isShow = false;
    }

    open(name: string){
        this.isOpen = true;
        this.name = name
    }

    close(){
        this.isOpen = false;
        this.name = ''
    }



}