import {makeAutoObservable} from "mobx";
import {AuthService} from "../services/auth-service";
import {popupStore} from "../../index";
import {IPartnership} from "../models/IPartnership";

export class AuthStore{
    isAuth: boolean = false;
    isLoading: boolean = false

    isTrustEmail: boolean = false

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setIsTrustEmail(bool: boolean){
        this.isTrustEmail = bool
        this.isLoading = false
    }

    setLoading(bool: boolean){
        this.isLoading = bool
    }

    exit(){
        this.setAuth(false)
        localStorage.removeItem('token')
    }

    async checkEmail(email: string){
        try{
            this.setLoading(true)
            await AuthService.checkEmail(email)
            this.setIsTrustEmail(true)
        }
        catch (e: any) {
            popupStore.show(e?.response?.data?.message, 'ERROR')
            this.setLoading(false)
        }
    }

    async login(email: string, password: string){
        try{
            this.setLoading(true)
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
            this.setIsTrustEmail(false)
            popupStore.show('Добро пожаловать в систему', 'SUCCESS')
        }
        catch (e: any) {
            popupStore.show(e?.response?.data?.message, 'ERROR')
            this.setLoading(false)
        }
    }

    async logout(){
        await AuthService.logout();
        this.exit()
    }

    async refreshAccess(){
        try{
            const response = await AuthService.refreshAccess()
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true)
        }
        catch (e: any) {
            this.exit()
            //popupStore.show(e?.response?.data?.message, 'ERROR')
        }
    }

    async sendPartnershipRequest(data: IPartnership){
        try{
            this.setLoading(true)
            await AuthService.sendPartnershipRequest(data)
            popupStore.close()
            popupStore.show('Заявка успешно отправлена', 'SUCCESS')
            this.setLoading(false)
        }
        catch (e: any) {
            popupStore.show(e?.response?.data?.message, 'ERROR')
            this.setLoading(false)
        }
    }
}