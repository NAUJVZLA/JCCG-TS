export interface SolicitarValidacion {
    username: string;
    password: string;
}
export interface RespuestaDeV {
    mensaje: string,
    statusCode?: number,
    id?: number,
    email?: string
}
