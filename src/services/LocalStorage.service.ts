import { Injectable } from "@angular/core";
import { Nutricionista } from "../app/interfaces/nutricionista";
import * as CryptoJS from 'crypto-js';
import { CriptografiaService } from "../services/criptografia.service";

@Injectable()
export class LocalStorageService {
    
    constructor(
        private criptografiaService : CriptografiaService
    ){}

    //Lista Nutricionista
    setLocalStorageListaNutricionista(nutricionistaLista:Nutricionista[]):void{
        localStorage.setItem("NutricionistaLista",  this.criptografiaService.encryptData(JSON.stringify(nutricionistaLista)));
    }
    getLocalStorageListaNutricionista():Nutricionista[]{
        return JSON.parse(localStorage.getItem("NutricionistaLista"));
    }

    //Nutricionista
    setLocalStorageNutricionistaLogado(nutricionistaLogado:Nutricionista):void{
        localStorage.setItem("NutricionistaLogado",  this.criptografiaService.encryptData(JSON.stringify(nutricionistaLogado)));
    }
    getLocalStorageNutricionistaLogado():Nutricionista{
        return JSON.parse(localStorage.getItem("NutricionistaLogado"));
    }
}