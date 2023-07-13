import { Injectable } from "@angular/core";

@Injectable()
export class CriptografiaService {
    
    constructor(){}

    embaralharString(string: string): string {
        // Converte a string em uma array de caracteres
        const arrayCaracteres = string.split('');
      
        // Embaralha a array de caracteres usando o algoritmo de Fisher-Yates
        for (let i = arrayCaracteres.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arrayCaracteres[i], arrayCaracteres[j]] = [arrayCaracteres[j], arrayCaracteres[i]];
        }
      
        // Junta os caracteres embaralhados de volta em uma string
        const stringEmbaralhada = arrayCaracteres.join('');
      
        return stringEmbaralhada;
      }

    desembaralharString(stringEmbaralhada: string): string {
        // Converte a string embaralhada em uma array de caracteres
        const arrayCaracteres = stringEmbaralhada.split('');
      
        // Cria uma cópia da array de caracteres
        const arrayDesembaralhada = [...arrayCaracteres];
      
        // Embaralha a cópia da array de caracteres usando o algoritmo de Fisher-Yates
        for (let i = arrayDesembaralhada.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arrayDesembaralhada[i], arrayDesembaralhada[j]] = [arrayDesembaralhada[j], arrayDesembaralhada[i]];
        }
      
        // Converte a array desembaralhada em uma string
        const stringDesembaralhada = arrayDesembaralhada.join('');
      
        return stringDesembaralhada;
      }
}