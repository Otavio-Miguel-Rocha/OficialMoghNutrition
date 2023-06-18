import { Component, OnInit } from '@angular/core';
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

  constructor(private router: Router) { }

  ngOnInit() {
    const validaUsuarioLogado: Nutricionista = JSON.parse(localStorage.getItem("nutricionistaLogado"));
    if(validaUsuarioLogado == null){
      this.abrirModalAviso("ACESSO NEGADO", "Você deve estar logado para acessar essa página!");
      this.router.navigate(['/Menu-Inicial']);
    }
  }

  //MODAL CONFIRMAÇÃO OU AVISO
  aparecerModal:boolean = false;
  tipoModal:boolean;
  tituloModal:string;
  conteudoModal:string;

  confirmarLogout():void{
    this.abrirModalConfirmacao("LOGOUT", "Deseja Mesmo Sair?");
  }
  fecharModalRegistrar():void{
    this.aparecerModal = false;
  }

  //

  listaPacientesRoute () : void {
    this.router.navigate(['/Lista-Pacientes'])
  }

  CadastrarPacienteRoute () : void {
    this.router.navigate(['/Cadastro-Paciente'])
  }


  botaoConfirmarModal():void{
    localStorage.removeItem("nutricionistaLogado");
    this.LogoutRoute();
  }
  LogoutRoute() : void {
    this.router.navigate(['/Menu-Inicial'])
  }

  abrirModalConfirmacao(titulo:string, conteudo:string):void{
    this.aparecerModal = true;
    this.tituloModal = titulo;
    this.conteudoModal = conteudo;
    this.tipoModal = false;
  }
  abrirModalAviso(titulo:string, conteudo:string):void{
    this.aparecerModal = true;
    this.tituloModal = titulo;
    this.conteudoModal = conteudo;
    this.tipoModal = true;
  }


}
