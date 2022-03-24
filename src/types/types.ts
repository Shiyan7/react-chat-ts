import {Dispatch, SetStateAction} from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export interface IAuthUser {
    _id: string | null
    avatar: string | null
    name: string | null
}

export interface IMessage {
    uid: string
    displayName: string
    text: string
    timestamp: string 
}

export interface IUser {
    firstName: string
    lastName: string
    email: string
    password: string
}