// Define la estructura de la respuesta para un post
export interface RespuestaPost {
    id: number;
    postByUser: number;
    title: string;
    body: string;
    creationDate: Date;
    estimatedPublicationDate: Date;
    status: string;
    approvalPercentage: number;
    corrections: string;
    platform: string;
    postUrl: string;
    multimediaUrl: string;
    deletedAt: null;
}

// Define la estructura de la petición para crear o actualizar un post
export interface PeticionPost {
    title: string;
    body: string;
    creationDate: String;
    creator: string;
    estimatedPublicationDate: String;
    status: string;
    approvalPercentage: number;
    corrections: string;
    platform: string;
    postUrl: string;
    multimediaUrl: string;
}

// Define la estructura de la respuesta al crear un nuevo post
export interface RespuestaCrearPost {
    postByUser: number;
    title: string;
    body: string;
    creationDate: Date;
    estimatedPublicationDate: Date;
    status: string;
    approvalPercentage: number;
    corrections: string;
    platform: string;
    postUrl: string;
    multimediaUrl: string;
    creator: Creator;
    id: number;
    deletedAt: null;
}

// Define la estructura del creador del post
export interface Creator {
    id: number;
    email: string;
    password: string;
}


// Define la estructura de la respuesta de una API que proporciona datos meteorológicos
export interface RespuestaW {
    main: Main;
}

// Define la estructura de los datos meteorológicos principales
export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
}
// Define la estructura para crear una nueva ciudad
export interface CrearCiudad {
    name: string,
    country: string,
    createdAt: string,
    reason: string
}

// Define la estructura de la respuesta al crear una nueva ciudad
export interface ResponseCreateCity {
    info: CrearCiudad,
    temperature: number
}