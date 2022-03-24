import React from "react";
import {SignIn, SignUp} from "../pages";
import {Chat} from '../pages/Chat/Chat';
import {CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE} from "../utils/conts";

export interface IRoute {
    path: string;
    exact?: boolean;
    component: React.ComponentType;
}

export const publicRoutes: IRoute[] = [
    {path: LOGIN_ROUTE, exact: true, component: SignIn},
    {path: REGISTER_ROUTE, exact: true, component: SignUp}
]

export const privateRoutes: IRoute[] = [
    {path: CHAT_ROUTE, exact: true, component: Chat}
]