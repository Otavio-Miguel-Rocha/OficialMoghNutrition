import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

interface Nutricionista {
  nomeCompleto : string,
  email : string,
  senha : string,
  CRN : string;
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
    const validaUsuarioLogado: Nutricionista = JSON.parse(localStorage.getItem("nutricionistaLogado"));
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

  //
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
