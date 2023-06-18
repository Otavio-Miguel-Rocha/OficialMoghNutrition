import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Nutricionista {
  nomeCompleto : string,
  email : string,
  senha : string,
  CRN : string;
}

interface Paciente {
  nomeCompleto: string,
  email: string,
  telefone: string,
  sexo: string,
  dataNascimento: string,
  mostrarModal:boolean,
}

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.css']
})
export class NovaConsultaComponent implements OnInit {
  arrowBack : string;
  modalBoolean : boolean;

  
  constructor(private router: Router) { 
    this.arrowBack = '/assets/img/arrowBack.png'
  }

  pacienteNovaConsulta: Paciente;

  ngOnInit() {
    const validaUsuarioLogado: Nutricionista = JSON.parse(localStorage.getItem("nutricionistaLogado"));
    if(validaUsuarioLogado == null){
      this.abrirModalAviso("ACESSO NEGADO", "Você deve estar logado para acessar essa página!");
      this.router.navigate(['/Menu-Inicial']);
    }
    else{
      this.pacienteNovaConsulta = JSON.parse(localStorage.getItem("PacienteNovaConsulta"));
    }

    }

  voltaListaPacientes() : void {
    this.router.navigate(['/Lista-Pacientes'])
  }


  //MODAL CONFIRMAÇÃO OU AVISO
  aparecerModal:boolean = false;
  tipoModal:boolean;
  tituloModal:string;
  conteudoModal:string;
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
