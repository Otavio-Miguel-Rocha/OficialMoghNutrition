import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

// Implementação da interface Nutricionista
interface Nutricionista {
  nomeCompleto : string,
  email : string,
  senha : string,
  CRN : string,
  listaPacientes : Paciente[]
}
// Implementação da interface Paciente
interface Paciente {
  nomeCompleto: string,
  email: string,
  telefone: string,
  sexo: string,
  dataNascimento: string,
  mostrarModal:boolean,
  relatorios: Consulta[],
}
// Implementação da interface Consulta
interface Consulta {
  altura: string,
  peso: string,
  porcentagemGordura: string,
  taxaMetabolicaBasal: string,
  triglicerideos: string,
  diabetes: string,
  colesterol: string,
  autofeedback : string,
  objetivoConsulta : string,
  dataConsulta : string,
  nomePaciente : string,
  imc: string,
}

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  @Output()
  informarLogOut = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
    // Recebendo o usuário logado salvo no local  Storage
    const validaUsuarioLogado: Nutricionista = JSON.parse(localStorage.getItem("nutricionistaLogado"));
    // Caso o valor recebido seja nulo será rediricionado para o menu principal
    if(validaUsuarioLogado == null){
      this.router.navigate(['/Menu-Inicial']);
    }
    else{
      this.nomeNutricionistaLogado = validaUsuarioLogado.nomeCompleto;
    }
  }

  nomeNutricionistaLogado: string;

  //MODAL CONFIRMAÇÃO OU AVISO
  aparecerModalLogOut:boolean = false;

  confirmarLogout():void{
    this.aparecerModalLogOut = true;
  }
  fecharModalLogOut():void{
    this.aparecerModalLogOut = false;
  }

  // Rotas linkadas com as opções no HTML
  listaPacientesRoute () : void {
    this.router.navigate(['/Lista-Pacientes'])
  }
  CadastrarPacienteRoute () : void {
    this.router.navigate(['/Cadastro-Paciente'])
  }
  logOutRoute() : void {
    localStorage.removeItem("nutricionistaLogado");
    this.router.navigate(['/Menu-Inicial'])
  }
}
