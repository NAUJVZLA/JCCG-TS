// icono cargando

// Función para mostrar la ventana de carga
function showLoadingScreen(): void {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex'; // Mostrar la ventana de carga
    }
}

// Función para ocultar la ventana de carga
function hideLoadingScreen(): void {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    if (loadingScreen) {
        loadingScreen.style.display = 'none'; // Ocultar la ventana de carga
    }
    if (content) {
        content.style.display = 'block'; // Mostrar el contenido
    }
}

// Función para simular la carga de contenido
function loadContent(): void {
    showLoadingScreen();
    // Simula una carga de contenido con un retraso de 2 segundos (2000 ms)
    setTimeout(() => {
        hideLoadingScreen();
    }, 2000); // Cambia este tiempo según tus necesidades
}

// Llama a loadContent cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadContent);