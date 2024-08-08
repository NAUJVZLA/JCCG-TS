// Define la estructura del objeto que se envía para solicitar la validación de un usuario
export interface SolicitarValidacion {
    username: string; // Nombre de usuario proporcionado para la validación
    password: string; // Contraseña proporcionada para la validación
}
// Define la estructura de la respuesta que se recibe al solicitar la validacion
export interface RespuestaDeV {
    mensaje: string;          // Mensaje que describe el resultado de la validación (e.g., "Inicio de sesión exitoso" o "Credenciales incorrectas")
    statusCode?: number;     // Código de estado HTTP opcional que indica el resultado de la solicitud (e.g., 200 para éxito, 401 para error de autenticación)
    id?: number;             // Identificador opcional del usuario en caso de que la validación sea exitosa (e.g., el ID del usuario en la base de datos)
    email?: string;          // Correo electrónico opcional del usuario en caso de que la validación sea exitosa (e.g., la dirección de correo electrónico del usuario)
}
