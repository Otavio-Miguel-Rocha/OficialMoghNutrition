import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  //MODAL CONFIRMAÇÃO
    modalConfirmacao:boolean = false;
    abrirModalConfirmacao():void{
      this.modalConfirmacao = true;
    }
  //

  NovaConsultaRoute () : void {
    this.router.navigate(['/Nova-Consulta'])
  }

  listaPacientesRoute () : void {
    this.router.navigate(['/Lista-Pacientes'])
  }

  CadastrarPacienteRoute () : void {
    this.router.navigate(['/Cadastro-Paciente'])
  }

  LogoutRoute() : void {
    this.router.navigate(['/Menu-Inicial'])
  }


}
