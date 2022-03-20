import React from "react";
import {Login} from "../pages/Login";
import {Chat} from '../pages/Chat';
import { CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "../utils/conts";
import { Register } from "../pages/Register";

export interface IRoute {
    path: string;
    exact?: boolean;
    component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
    {path: LOGIN_ROUTE, exact: true, component: Login},
    {path: REGISTER_ROUTE, exact: true, component: Register}
]

export const privateRoutes: IRoute[] = [
    {path: CHAT_ROUTE, exact: true, component: Chat}
]