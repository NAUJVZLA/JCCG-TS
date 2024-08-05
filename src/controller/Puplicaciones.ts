import { RespuestaPost, PeticionPost, RespuestaCrearPost, CrearCiudad, RespuestaW } from '../model/func/publicaciones';

export class PostController {

    //Create Post
    async createPost(data: PeticionPost): Promise<RespuestaCrearPost> {
        const userLogedEmail = sessionStorage.getItem('x-user-email');
        const domain: string = 'https://api-posts.codificando.xyz/posts/';
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            "x-user-email": `${userLogedEmail}`,
        }
        const reqOptions: RequestInit = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }
        const url = domain;
        const result: Response = await fetch(url, reqOptions);
        const responseBody: RespuestaCrearPost = await result.json();

        if (result.status === 201) {
            return responseBody as RespuestaCrearPost
        } else {
            console.error(`Response body: ${result.status}`);
            throw new Error(`Response body: ${result.status}`);
        }
    }


    //Get Posts
    async getPosts(): Promise<Array<RespuestaPost>> {
        
        //dato para mostrar de id 
        const idUser = JSON.parse(localStorage.getItem('userIds') || '[]');
        const usuarioLMail = sessionStorage.getItem('x-user-email');
        const userLogedId = idUser.find((user: { email: string }) => user.email === usuarioLMail);
        const urlApi: string = "https://api-posts.codificando.xyz/posts/by-creator/";
        const params: string = `${userLogedId.id}`
        const headers: Record<string, string> = {
            "Content-Type": "application/json",

            "x-user-email": `${usuarioLMail}`,
        };
        const reqOptions: RequestInit = {
            method: "GET",
            headers: headers,
        };
        const url = urlApi + params;
        const result: Response = await fetch(url, reqOptions);
        if (result.status === 200) {
            const responseBodyPosts: Array<RespuestaPost> = await result.json();
            return responseBodyPosts;
        } else if (result.status === 500) {
            throw new Error(`Get Post Error ${result.status}`);
        } else {
            throw new Error(`Get Post Error ${result.status}`);
        }
    }



    //borrar lugar
    borrarCiudad(name: string): boolean {
        try {
            const cities = JSON.parse(localStorage.getItem('cities') || '[]');

            const updatedCities = cities.filter((city: { info: { name: string } }) => city.info.name.toLowerCase() !== name.toLowerCase());

            localStorage.setItem('cities', JSON.stringify(updatedCities));

            return cities.length !== updatedCities.length;
        } catch (error) {
            throw new Error(`Error DC ${error}`);
        }
    }

    // actualizar
    async actualizaCity(name: string, updatedData: CrearCiudad): Promise<boolean> {
        try {
            const cities = JSON.parse(localStorage.getItem('cities') || '[]');

            const index = cities.findIndex((city: { info: { name: string } }) => city.info.name.toLowerCase() === name.toLowerCase());

            if (index !== -1) {
                const temperature = (await this.getWeather(updatedData.name)).main.temp;

                const updatedCity = {
                    info: updatedData,
                    temperature,
                };

                cities[index] = updatedCity;

                localStorage.setItem('cities', JSON.stringify(cities));

                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw new Error(`Error al actualizar la ciudad: ${error}`);
        }
    }


    //LUGAR CONTROLS
    private async getWeather(name: string): Promise<RespuestaW> {
        const domain: string = '/api/data/2.5/weather';
        const queryParams: string = `?q=${name.toLowerCase()}&appid=4934e44ff1d73160e5749efcbabad009`;
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        const reqOptions: RequestInit = {
            method: "GET",
            headers: headers,
        };
        const url: string = domain + queryParams;
        const weatherResponse: Response = await fetch(url, reqOptions);
        if (weatherResponse.ok) {
            const responseBodyWeather: RespuestaW = await weatherResponse.json();
            return responseBodyWeather;
        } else if (weatherResponse.status == 404) {
            throw new Error(`City not found, status ${weatherResponse.status}`);
        } else {
            throw new Error(`We're sorry, it seems a weather error occurred, status ${weatherResponse.status}`);
        }
    }

    //Color estado
    colorEstado(progress: number): string {
        if (progress <= 95) {
            return 'rgb(150, 10, 10)';
        } else {
            return 'rgb(66, 183, 42)';
        }
    }


}