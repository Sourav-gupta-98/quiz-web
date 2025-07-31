import {createContext} from "react";

let self = localStorage.getItem('self');
let token = localStorage.getItem('token');

export const LoginData = createContext({self: self ? JSON.parse(self) : '', token: token ? token : ''});
