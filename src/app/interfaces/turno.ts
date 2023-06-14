export interface Turno {
    idPaciente: string,
    nombrePaciente: string,
    idEspecialista: string,
    nombreEspecialista: string,
    tipo: string,
    fecha: Date,
    duracion: number,
    estado: Estado,
    resenia?: string,
    encuesta?: string,
    calificacion?: string
}

export enum Estado{
    pendiente,
    aceptado,
    cancelado,
    rechazado,
    realizado
}
