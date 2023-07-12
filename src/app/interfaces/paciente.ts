import { Consulta } from "./consulta";

export interface Paciente {
    nomeCompleto: string,
    email: string,
    telefone: string,
    sexo: string,
    dataNascimento: string,
    mostrarModal:boolean,
    relatorios: Consulta[]
}