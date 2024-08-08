// Define una función asincrónica llamada fetchProducts
async function fetchProducts() {
    try {
        // hacer una solicitud HTTP al endpoint especificado para obtener datos de productos
        const response = await fetch('https://api-posts.codificando.xyz/');
        // Convierte la respuesta de la solicitud en formato JSON
        const products = await response.json();
        // Obtiene el elemento de la lista en el documento HTML con el id 'productList'
        const productList = document.getElementById('productList') as HTMLUListElement;
        // Recorre cada producto en el array de productos
        products.forEach((product: { name: string; price: number; }) => {
            // Crea un nuevo elemento de lista (li)
            const listItem = document.createElement('li');

            // Configura el contenido del elemento de lista con el nombre y el precio del producto
            listItem.textContent = `${product.name} - $${product.price}`;
            productList.appendChild(listItem);
        });

        // Obtiene el nombre de usuario y el rol desde el almacenamiento de sesión del navegador
        const username = sessionStorage.getItem('username');
        const role = sessionStorage.getItem('role');

        // Obtiene el elemento HTML donde se mostrará el mensaje de bienvenida con el id 'welcomeMessage'
        const welcomeMessage = document.getElementById('welcomeMessage') as HTMLHeadingElement;

        // Verifica el rol del usuario y ajusta el mensaje de bienvenida en consecuencia
        if (role === 'admin') {

            // Si el rol es 'admin', incluye (Admin) en el mensaje de bienvenida
            welcomeMessage.textContent = `Welcome, ${username} (Admin)`;
        } else {
            // De lo contrario, solo muestra el nombre de usuario
            welcomeMessage.textContent = `Welcome, ${username}`;
        }
    } catch (error) {
        // Si ocurre un error durante la solicitud o procesamiento, lo captura y muestra en la consola
        console.error('Error:', error);
    }
}
// Asocia la función fetchProducts al evento DOMContentLoaded para que se ejecute cuando el contenido del documento esté completamente cargado
document.addEventListener('DOMContentLoaded', fetchProducts);
// Muestra una alerta en la página con el mensaje 'dashboard' para notificar o probar algo
alert('dashboard');


// dashboard.ts - Este archivo maneja la lógica de la página de dashboard

// async function fetchProducts() {
//     try {
//         const response = await fetch('http://localhost:5000/products'); // URL del JSON Server
//         const products = await response.json();
//         const productList = document.getElementById('productList') as HTMLUListElement;

//         products.forEach((product: { name: string; price: number; }) => {
//             const listItem = document

