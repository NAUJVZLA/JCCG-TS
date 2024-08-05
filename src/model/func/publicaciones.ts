export interface RespuestaPost {
    id:                       number;
    postByUser:               number;
    title:                    string;
    body:                     string;
    creationDate:             Date;
    estimatedPublicationDate: Date;
    status:                   string;
    approvalPercentage:       number;
    corrections:              string;
    platform:                 string;
    postUrl:                  string;
    multimediaUrl:            string;
    deletedAt:                null;
}

export interface PeticionPost {
    title:                    string;
    body:                     string;
    creationDate:             String;
    creator:                  string;
    estimatedPublicationDate: String;
    status:                   string;
    approvalPercentage:       number;
    corrections:              string;
    platform:                 string;
    postUrl:                  string;
    multimediaUrl:            string;
}
export interface RespuestaCrearPost {
    postByUser:               number;
    title:                    string;
    body:                     string;
    creationDate:             Date;
    estimatedPublicationDate: Date;
    status:                   string;
    approvalPercentage:       number;
    corrections:              string;
    platform:                 string;
    postUrl:                  string;
    multimediaUrl:            string;
    creator:                  Creator;
    id:                       number;
    deletedAt:                null;
}
export interface Creator {
    id:       number;
    email:    string;
    password: string;
}



export interface RespuestaW {
    main:       Main;
}

export interface Main {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    humidity:   number;
    sea_level:  number;
    grnd_level: number;
}

export interface CrearCiudad{
    name:string,
    country:string,
    createdAt:string,
    reason:string
}

export interface ResponseCreateCity{
    info: CrearCiudad,
    temperature: number
}