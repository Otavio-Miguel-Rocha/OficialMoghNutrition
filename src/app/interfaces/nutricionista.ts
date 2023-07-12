import { Paciente } from "./paciente";

export interface Nutricionista {
   
        nomeCompleto : string,
        email : string,
        senha : string,
        CRN : string,
        listaPacientes : Paciente[]
      
}