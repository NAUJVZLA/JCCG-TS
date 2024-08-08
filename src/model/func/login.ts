// login.ts - Este archivo maneja la lógica del formulario de login

const loginForm = document.getElementById('loginForm') as HTMLFormElement;

// Añade un manejador de eventos para el evento 'submit' del formulario
loginForm.addEventListener('submit', async (event) => {
    // Evita que el formulario realice la acción predeterminada de recargar la página
    event.preventDefault();
    // Obtiene el valor ingresado en el campo de nombre de usuario, usando su id 'username'
    const username = (document.getElementById('username') as HTMLInputElement).value;

    // Obtiene el valor ingresado en el campo de contraseña, usando su id 'password'
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
        // Hace una solicitud HTTP a la API para obtener la lista de usuarios
        const response = await fetch('https://api-posts.codificando.xyz'); // URL de la api U_U

        // Convierte la respuesta de la solicitud en un objeto JSON
        const users = await response.json();

        // Busca un usuario en la lista que coincida con el nombre de usuario y la contraseña proporcionados
        const user = users.find((user: { username: string; password: string; role: string; }) => user.username === username && user.password === password);

        // Verifica si se encontró un usuario que coincida
        if (user) {
            // Si el usuario existe, guarda un token y el rol en el almacenamiento de sesión
            sessionStorage.setItem('token', user.mensaje); // Almacena el token en sessionStorage (puede ser 'user.token')
            sessionStorage.setItem('role', user.value); // Almacena el rol en sessionStorage (debería ser 'user.role')
            // Redirige al usuario a la página del dashboard
            window.location.href = '/src/model/links/dashboard.html';
        } else {
            // Si no se encuentra el usuario, muestra una alerta con un mensaje de error
            alert('error de clave o usuario');
        }
    } catch (error) {
        // Si ocurre un error durante la solicitud o el procesamiento, lo captura y lo muestra en la consola
        console.error('Error:', error);
    }
});

console.log(loginForm);


