// register.ts - Este archivo maneja la lógica del formulario de registro

const registerForm = document.getElementById('registerForm') as HTMLFormElement;

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
        const response = await fetch('https://api-posts.codificando.xyz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role: 'user' }) // El rol predeterminado es 'user'
        });

        if (response.ok) {
            alert('User registered successfully');
            window.location.href = '/login.html';
        } else {
            alert('Failed to register user');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
alert('register');