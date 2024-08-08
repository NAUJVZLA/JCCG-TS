import { RespuestaPost, PeticionPost, RespuestaCrearPost, CrearCiudad, RespuestaW } from '../model/func/publicaciones';

// Define la clase PostController que maneja operaciones relacionadas con posts y ciudades
export class PostController {

    // Método para crear un nuevo post
    async createPost(data: PeticionPost): Promise<RespuestaCrearPost> {

        // Obtiene el correo electrónico del usuario logueado desde sessionStorage
        const userLogedEmail = sessionStorage.getItem('x-user-email');

        // Define la URL de la API para crear un post
        const domain: string = 'https://api-posts.codificando.xyz/posts/';

        // Define los encabezados para la solicitud HTTP
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            "x-user-email": `${userLogedEmail}`,
        }
        // Define las opciones para la solicitud HTTP
        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
        // URL completa para la solicitud HTTP
        const url = domain;

        // Realiza la solicitud HTTP a la API
        const result: Response = await fetch(url, reqOptions);

        // Convierte la respuesta en JSON y la asigna a responseBody
        const responseBody: RespuestaCrearPost = await result.json();

        // Verifica si la solicitud fue exitosa (código de estado 201)
        if (result.status === 201) {
            return responseBody as RespuestaCrearPost; // Devuelve la respuesta del servidor como RespuestaCrearPost
        } else {
            console.error(`Response body: ${result.status}`);
            throw new Error(`Response body: ${result.status}`);
        }
    }


    // Método para obtener todos los posts del usuario logueado
    async getPosts(): Promise<Array<RespuestaPost>> {

        // Obtiene el ID del usuario desde localStorage
        const idUser = JSON.parse(localStorage.getItem('userIds') || '[]');
        const usuarioLMail = sessionStorage.getItem('x-user-email');

        // Encuentra el ID del usuario logueado en la lista de IDs de usuario
        const userLogedId = idUser.find((user: { email: string }) => user.email === usuarioLMail);

        // Define la URL de la API para obtener los posts del creador
        const urlApi: string = "https://api-posts.codificando.xyz/posts/by-creator/";
        const params: string = `${userLogedId.id}`

        // Define los encabezados para la solicitud HTTP
        const headers: Record<string, string> = {
            "Content-Type": "application/json",

            "x-user-email": `${usuarioLMail}`,
        };
        const reqOptions: RequestInit = {
            method: "GET",
            headers: headers,
        };

        // URL completa para la solicitud HTTP
        const url = urlApi + params;
        const result: Response = await fetch(url, reqOptions);

        // Verifica si la solicitud fue exitosa (código de estado 200)
        if (result.status === 200) {

            // Convierte la respuesta en JSON y la asigna a responseBodyPosts
            const responseBodyPosts: Array<RespuestaPost> = await result.json();
            return responseBodyPosts; // Devuelve la lista de posts
        } else if (result.status === 500) {
            throw new Error(`Get Post Error ${result.status}`);
        } else {
            throw new Error(`Get Post Error ${result.status}`);
        }
    }



    // Método para eliminar una ciudad de localStorage
    borrarCiudad(name: string): boolean {
        try {
            // Obtiene la lista de ciudades de localStorage
            const cities = JSON.parse(localStorage.getItem('cities') || '[]');

            // Filtra la lista de ciudades para eliminar la ciudad con el nombre proporcionado
            const updatedCities = cities.filter((city: { info: { name: string } }) => city.info.name.toLowerCase() !== name.toLowerCase());

            // Actualiza localStorage con la lista de ciudades filtrada
            localStorage.setItem('cities', JSON.stringify(updatedCities));

            // Devuelve true si la lista de ciudades ha cambiado (una ciudad fue eliminada), de lo contrario false
            return cities.length !== updatedCities.length;
        } catch (error) {
            throw new Error(`Error DC ${error}`);
        }
    }

    // Método para actualizar una ciudad en localStorage
    async actualizaCity(name: string, updatedData: CrearCiudad): Promise<boolean> {
        try {
            // Obtiene la lista de ciudades de localStorage
            const cities = JSON.parse(localStorage.getItem('cities') || '[]');

            // Encuentra el índice de la ciudad que coincide con el nombre proporcionado
            const index = cities.findIndex((city: { info: { name: string } }) => city.info.name.toLowerCase() === name.toLowerCase());

            // Si se encuentra la ciudad, actualiza su información
            if (index !== -1) {
                // Obtiene el clima actual de la ciudad
                const temperature = (await this.getWeather(updatedData.name)).main.temp;

                // Crea un objeto actualizado para la ciudad
                const updatedCity = {
                    info: updatedData,
                    temperature,
                };

                // Reemplaza la ciudad antigua con la ciudad actualizada en la lista
                cities[index] = updatedCity;

                // Actualiza localStorage con la lista de ciudades actualizada
                localStorage.setItem('cities', JSON.stringify(cities));

                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(`Error al actualizar la ciudad: ${error}`);
        }
    }


    // Método privado para obtener el clima de una ciudad usando una API externa
    private async getWeather(name: string): Promise<RespuestaW> {

        // Define la URL de la API para obtener datos meteorológicos
        const domain: string = '/api/data/2.5/weather';
        const queryParams: string = `?q=${name.toLowerCase()}&appid=4934e44ff1d73160e5749efcbabad009`;
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        // Define las opciones para la solicitud HTTP
        const reqOptions: RequestInit = {
            method: "GET",
            headers: headers,
        };

        // URL completa para la solicitud HTTP
        const url: string = domain + queryParams;

        // Realiza la solicitud HTTP a la API del clima
        const weatherResponse: Response = await fetch(url, reqOptions);

        // Verifica si la solicitud fue exitosa (código de estado 200)
        if (weatherResponse.ok) {

            // Convierte la respuesta en JSON y la asigna a responseBodyWeather
            const responseBodyWeather: RespuestaW = await weatherResponse.json();
            return responseBodyWeather;// Devuelve la información del clima
        } else if (weatherResponse.status == 404) {
            throw new Error(`City not found, status ${weatherResponse.status}`);
        } else {
            throw new Error(`We're sorry, it seems a weather error occurred, status ${weatherResponse.status}`);
        }
    }

    // Método para determinar el color basado en el progreso
    colorEstado(progress: number): string {
        // Devuelve un color basado en el valor del progreso
        if (progress <= 95) {
            return 'rgb(150, 10, 10)';
        } else {
            return 'rgb(66, 183, 42)';
        }
    }


}