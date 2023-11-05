import $api from "../api";
import {CHECK_EMAIL, LOGIN, LOGOUT, REFRESH_ACCESS, SEND_PARTNERSHIP_REQUEST} from "../constants/api";
import {AxiosResponse} from "axios";
import {IPartnership} from "../models/IPartnership";

interface IAuth {
    refreshToken: string,
    accessToken: string
}

export class AuthService{
    static checkEmail = async (email: string) => {
        return await $api.post(CHECK_EMAIL, {email})
    }

    static login = async (email: string, password: string): Promise<AxiosResponse<IAuth>> => {
        return await $api.post(LOGIN, {email, password})
    }

    static logout = async () => {
        return await $api.get(LOGOUT)
    }

    static refreshAccess = async (): Promise<AxiosResponse<IAuth>> => {
        return await $api.get(REFRESH_ACCESS)
    }

    static sendPartnershipRequest = async (data: IPartnership) => {
        return await $api.post(SEND_PARTNERSHIP_REQUEST, data)
    }
}

