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
    horarios?: Horario[]
    email: string, 
    imagen1: any,
    imagen2?: any,
    habilitado?: boolean
}

export interface Horario{
    especialidad: string,
    tiempo: number,
    dias: Dia[]
}

export interface Dia{
    nombre: string,
    estado: boolean,
    inicio: number,
    fin: number,
}
