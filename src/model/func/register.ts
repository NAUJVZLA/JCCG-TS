
// Obtiene una referencia al formulario de registro del documento HTML usando su id 'registerForm'
const registerForm = document.getElementById('registerForm') as HTMLFormElement;

// Añade un manejador de eventos para el evento 'submit' del formulario
registerForm.addEventListener('submit', async (event) => {
    // Previene que el formulario realice la acción predeterminada de recargar la página
    event.preventDefault();
    // Obtiene el valor ingresado en el campo de nombre de usuario, usando su id 'username'
    const username = (document.getElementById('username') as HTMLInputElement).value;
    // Obtiene el valor ingresado en el campo de contraseña, usando su id 'password'
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
        // Realiza una solicitud HTTP POST a la API para registrar al nuevo usuario
        const response = await fetch('https://api-posts.codificando.xyz', {
            method: 'POST', // Método HTTP utilizado para enviar datos
            headers: {
                'Content-Type': 'application/json' // Indica que el cuerpo de la solicitud está en formato JSON
            },
            // Convierte el objeto con los datos del usuario a una cadena JSON para el cuerpo de la solicitud
            body: JSON.stringify({ username, password, role: 'user' }) // El rol predeterminado es 'user'
        });

        // Verifica si la respuesta de la API indica éxito (código de estado 2xx)
        if (response.ok) {
            // Muestra una alerta informando que el usuario se registró exitosamente
            alert('User registered successfully');
            window.location.href = '/login.html';
        } else {
            // Si la respuesta no es exitosa, muestra una alerta de error
            alert('Failed to register user');
        }
    } catch (error) {
        // Captura y muestra cualquier error que ocurra durante la solicitud o el procesamiento
        console.error('Error:', error);
    }
});
alert('register');