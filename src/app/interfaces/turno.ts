export interface Turno {
    id: string,
    idPaciente: string,
    nombrePaciente: string,
    dniPaciente: string,
    idEspecialista: string,
    nombreEspecialista: string,
    tipo: string,
    fecha: Date,
    duracion: number,
    estado: Estado,
    resenia?: string,
    encuesta?: string,
    calificacion?: string,
    mensajeCancelacion?: string
}

export enum Estado{
    pendiente,
    aceptado,
    canceladoPaciente,
    canceladoEspecialista,
    canceladoAdmin,
    rechazado,
    realizado
}
