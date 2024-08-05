// login.ts - Este archivo maneja la lógica del formulario de login

const loginForm = document.getElementById('loginForm') as HTMLFormElement;

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
        const response = await fetch('https://api-posts.codificando.xyz'); // URL de la api U_U
        const users = await response.json();

        const user = users.find((user: { username: string; password: string; role: string; }) => user.username === username && user.password === password);

        if (user) {
            // Guardar el usuario y el rol en sessionStorage
            sessionStorage.setItem('token', user.mensaje);
            sessionStorage.setItem('role', user.value);
            window.location.href = '/src/model/links/dashboard.html';
        } else {
            alert('error de clave o usuario');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

console.log(loginForm);


