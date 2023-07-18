import { Injectable } from "@angular/core";
import { Nutricionista } from "src/app/interfaces/nutricionista";

@Injectable()
export class NutricionistaService {

  constructor() {}

  setNutricionistaLogado(nutricionista: Nutricionista) {
    localStorage.setItem("NutricionistaLogado", JSON.stringify(nutricionista));
  }

  getLoggedUser(): Nutricionista {
    let nutricionista: Nutricionista = JSON.parse(localStorage.getItem("NutricionistaLogado"))
    if (nutricionista) {
      return nutricionista;
    }
    return null;
  }

  removeNutricionistaLogado(): void{
    localStorage.removeItem("NutricionistaLogado");
  }
}