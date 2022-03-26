import {Settings, SignIn, SignUp, Chat} from "../pages";
import {CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, SETTINGS_ROUTE} from "../utils/conts";
import { IRoute } from "../types/types";

export const publicRoutes: IRoute[] = [
    {path: LOGIN_ROUTE, exact: true, component: SignIn},
    {path: REGISTER_ROUTE, exact: true, component: SignUp}
]

export const privateRoutes: IRoute[] = [
    {path: CHAT_ROUTE, exact: true, component: Chat},
    {path: SETTINGS_ROUTE, exact: true, component: Settings}
]