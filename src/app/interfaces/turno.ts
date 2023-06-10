export interface Turno {
    paciente: string,
    especialista: string,
    tipo: string,
    fecha: string,
    duracion: number,
    estado: string,
    resenia?: string,
    encuesta?: string,
    calificacion?: string
}
