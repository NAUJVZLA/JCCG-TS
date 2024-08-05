import { SolicitarValidacion, RespuestaDeV } from "../model/func/usuarioModelo";

export class UserController {
    constructor(
        private puntoLOG?: string,
        private puntoRegistro?: string
    ) { }

    //Controller Loguin Request Auth
    async postLogin(data: SolicitarValidacion): Promise<RespuestaDeV> {
        const domain: string = "https://api-posts.codificando.xyz";
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        const reqOptions: RequestInit = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        };
        const url = domain + this.puntoLOG;
        const result: Response = await fetch(url, reqOptions);
        if (result.status === 201) {
            const responseBodyLogin: RespuestaDeV = await result.json();
            if (responseBodyLogin.mensaje === 'Login successful') {
                return responseBodyLogin;
            } else {
                throw new Error(responseBodyLogin.mensaje);
            }
        } else {
            throw new Error(`Login Error ${result.status}`);
        }
    }

    //Controler Register Request Auth
    async postRegister(data: SolicitarValidacion): Promise<RespuestaDeV> {
        const domain: string = "https://api-posts.codificando.xyz";
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        const reqOptions: RequestInit = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        };
        const url = domain + this.puntoRegistro;
        const result: Response = await fetch(url, reqOptions);
        if (result.status === 201) {
            const responseBodyRegister: RespuestaDeV = await result.json();
            return responseBodyRegister;
        } else if (result.status === 500) {
            throw new Error(`Resgistration Error ${result.status}, probably email was registered before`);
        } else {
            throw new Error(`Registration Error ${result.status}`);
        }
    }


    //control  de la salida 
    async postLogout(): Promise<RespuestaDeV> {
        const domain: string = "https://api-posts.codificando.xyz";
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        const Ropcion: RequestInit = {
            method: "POST",
            headers: headers,
        };
        const url = domain + '/auth/logout';
        const result: Response = await fetch(url, Ropcion);
        if (result.status === 201) {
            const RespuestaLogin: RespuestaDeV = await result.json();
            if (RespuestaLogin.mensaje === 'Logout successful') {
                sessionStorage.clear();
                window.location.reload();
                return RespuestaLogin;
            } else {
                throw new Error(RespuestaLogin.mensaje);
            }
        } else {
            throw new Error(`Logout Error ${result.status}`);
        }
    }
}
