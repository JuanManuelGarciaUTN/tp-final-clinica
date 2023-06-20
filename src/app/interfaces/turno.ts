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
    mensajeCancelacion?: string,
    historiaClinica?: HistoriaClinica
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

export interface HistoriaClinica{
    altura: number,
    peso: number,
    temperatura: number,
    presionMin: string,
    presionMax: string,
    dato1?: DatoVariable,
    dato2?: DatoVariable,
    dato3?: DatoVariable,
}

export interface DatoVariable{
    clave: string,
    valor: string
}
