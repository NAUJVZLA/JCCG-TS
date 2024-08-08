import { SolicitarValidacion, RespuestaDeV } from "../model/func/usuarioModelo";

// Define la clase UserController que maneja operaciones de autenticación de usuario
export class UserController {
    // Constructor de la clase UserController que acepta dos parámetros opcionales
    constructor(
        private puntoLOG?: string, // URL relativa para el endpoint de inicio de sesión (opcional)
        private puntoRegistro?: string // URL relativa para el endpoint de registro (opcional)
    ) { }

    // Método para manejar las solicitudes de inicio de sesión (login)
    async postLogin(data: SolicitarValidacion): Promise<RespuestaDeV> {
        // Define la URL base de la API
        const domain: string = "https://api-posts.codificando.xyz";

        // Define los encabezados para la solicitud HTTP
        const headers: Record<string, string> = {
            "Content-Type": "application/json",  // Indica que el cuerpo de la solicitud está en formato JSON
        };

        // Define las opciones para la solicitud HTTP
        const reqOptions: RequestInit = {
            method: "POST",                     // Método HTTP para enviar datos al servidor
            headers: headers,                  // Encabezados definidos anteriormente
            body: JSON.stringify(data),        // Convierte el objeto data a una cadena JSON para el cuerpo de la solicitud
        };

        // Construye la URL completa para la solicitud de inicio de sesión
        const url = domain + this.puntoLOG;

        // Realiza la solicitud HTTP a la API
        const result: Response = await fetch(url, reqOptions);

        // Verifica si la solicitud fue exitosa (código de estado 201)
        if (result.status === 201) {

            // Convierte la respuesta en JSON y la asigna a responseBodyLogin
            const responseBodyLogin: RespuestaDeV = await result.json();
            if (responseBodyLogin.mensaje === 'Login successful') {
                return responseBodyLogin; // Devuelve la respuesta del servidor como RespuestaDeV
            } else {
                throw new Error(responseBodyLogin.mensaje); // Lanza una excepción si el mensaje indica un error
            }
        } else {
            throw new Error(`Login Error ${result.status}`); // Lanza una excepción si la solicitud no fue exitosa
        }
    }

    // Método para manejar las solicitudes de registro (registro de usuario)
    async postRegister(data: SolicitarValidacion): Promise<RespuestaDeV> {

        // Define la URL base de la API
        const domain: string = "https://api-posts.codificando.xyz";

        // Define los encabezados para la solicitud HTTP
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Define las opciones para la solicitud HTTP
        const reqOptions: RequestInit = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        };

        // Construye la URL completa para la solicitud de registro
        const url = domain + this.puntoRegistro;

        // Realiza la solicitud HTTP a la API
        const result: Response = await fetch(url, reqOptions);

        // Verifica si la solicitud fue exitosa (código de estado 201)
        if (result.status === 201) {

            // Convierte la respuesta en JSON y la asigna a responseBodyRegister
            const responseBodyRegister: RespuestaDeV = await result.json();
            return responseBodyRegister; // Devuelve la respuesta del servidor como RespuestaDeV
        } else if (result.status === 500) {
            throw new Error(`Resgistration Error ${result.status}, probably email was registered before`); // Lanza una excepción si ocurre un error en el servidor (posiblemente por un correo electrónico ya registrado)
        } else {
            throw new Error(`Registration Error ${result.status}`); // Lanza una excepción para otros códigos de error
        }
    }


    // Método para manejar las solicitudes de cierre de sesión (logout)
    async postLogout(): Promise<RespuestaDeV> {

        // Define la URL base de la API
        const domain: string = "https://api-posts.codificando.xyz";

        // Define los encabezados para la solicitud HTTP
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        const Ropcion: RequestInit = {
            method: "POST",
            headers: headers,
        };

        // Construye la URL completa para la solicitud de cierre de sesión
        const url = domain + '/auth/logout';

        // Realiza la solicitud HTTP a la API
        const result: Response = await fetch(url, Ropcion);

        // Verifica si la solicitud fue exitosa (código de estado 201)
        if (result.status === 201) {

            // Convierte la respuesta en JSON y la asigna a RespuestaLogin
            const RespuestaLogin: RespuestaDeV = await result.json();

            // Verifica si el mensaje de respuesta indica éxito
            if (RespuestaLogin.mensaje === 'Logout successful') {
                sessionStorage.clear();          // Limpia el almacenamiento de sesión
                window.location.reload();        // Recarga la página para reflejar el estado de cierre de sesión
                return RespuestaLogin;          // Devuelve la respuesta del servidor como RespuestaDeV
            } else {
                throw new Error(RespuestaLogin.mensaje);
            }
        } else {
            throw new Error(`Logout Error ${result.status}`);
        }
    }
}
