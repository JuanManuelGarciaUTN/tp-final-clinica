import { Especialidad } from "./especialidad";

export interface Usuario {
    id: string,
    tipo: string,
    nombre: string,
    apellido: string,
    dni: string,
    edad: string,
    obraSocial?: string | null,
    especialidades?: string[] | null,
    email: string, 
    imagen1: string,
    imagen2?: string | null
}
