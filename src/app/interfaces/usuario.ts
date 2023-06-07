import { Especialidad } from "./especialidad";

export interface Usuario {
    id: string,
    tipo: string,
    nombre: string,
    apellido: string,
    dni: string,
    edad: string,
    obraSocial?: string,
    especialidades?: string[],
    email: string, 
    imagen1: any,
    imagen2?: any,
    habilitado?: boolean
}
