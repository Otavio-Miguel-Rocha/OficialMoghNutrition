import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Nutricionista } from 'src/app/interfaces/nutricionista';
import { Consulta } from 'src/app/interfaces/consulta';
import { Paciente } from 'src/app/interfaces/paciente'
import { NutricionistaService } from 'src/services/user.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  @Output()
  informarLogOut = new EventEmitter();

  constructor(
    private router: Router,
    private nutricionistaService: NutricionistaService
    ) { }

  ngOnInit() {
    this.nomeNutricionistaLogado = this.nutricionistaService.getLoggedUser().nomeCompleto;
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
    this.nutricionistaService.removeNutricionistaLogado();
    this.router.navigate(['/Menu-Inicial'])
  }
}
