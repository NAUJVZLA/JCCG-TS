async function fetchProducts() {
    try {
        const response = await fetch('https://api-posts.codificando.xyz/');
        const products = await response.json();
        const productList = document.getElementById('productList') as HTMLUListElement;

        products.forEach((product: { name: string; price: number; }) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.name} - $${product.price}`;
            productList.appendChild(listItem);
        });

        const username = sessionStorage.getItem('username');
        const role = sessionStorage.getItem('role');

        const welcomeMessage = document.getElementById('welcomeMessage') as HTMLHeadingElement;
        if (role === 'admin') {
            welcomeMessage.textContent = `Welcome, ${username} (Admin)`;
        } else {
            welcomeMessage.textContent = `Welcome, ${username}`;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchProducts);
alert('dashboard');


// dashboard.ts - Este archivo maneja la lógica de la página de dashboard

// async function fetchProducts() {
//     try {
//         const response = await fetch('http://localhost:5000/products'); // URL del JSON Server
//         const products = await response.json();
//         const productList = document.getElementById('productList') as HTMLUListElement;

//         products.forEach((product: { name: string; price: number; }) => {
//             const listItem = document

