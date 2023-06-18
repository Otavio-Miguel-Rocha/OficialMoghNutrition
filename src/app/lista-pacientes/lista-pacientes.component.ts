import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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
  selector: "app-lista-pacientes",
  templateUrl: "./lista-pacientes.component.html",
  styleUrls: ["./lista-pacientes.component.css"],
})
export class ListaPacientesComponent implements OnInit {

  //IMAGENS
  upArrowIcon: string;
  downArrowIcon: string;
  arrowBack:string;

  listaPacientes: Paciente[] = [];


  constructor(private router: Router) {
    this.upArrowIcon = "/assets/img/arrowClosedModal.png";
    this.downArrowIcon = "/assets/img/arrowOpenModal.png";
    this.arrowBack = '/assets/img/arrowBack.png';
  }

  ngOnInit() {
    const validaUsuarioLogado: Nutricionista = JSON.parse(localStorage.getItem("nutricionistaLogado"));
    if(validaUsuarioLogado == null){
      this.abrirModalAviso("ACESSO NEGADO", "Você deve estar logado para acessar essa página!");
      this.router.navigate(['/Menu-Inicial']);
    }
    let listaPacientes: Paciente[] = JSON.parse(localStorage.getItem('ListaPacientes'));
    if( listaPacientes != null){
      this.listaPacientes = listaPacientes;
      console.log(this.listaPacientes);
    }
  }

  paciente : Paciente = {
    nomeCompleto : "",
    email : "",
    telefone : "",
    sexo : "",
    dataNascimento : "",
    mostrarModal: false,
  }

  //MODAL CONFIRMAÇÃO OU AVISO
  aparecerModal:boolean = false;
  tipoModal:boolean;
  tituloModal:string;
  conteudoModal:string;
  pacienteRemocao:Paciente;
  abrirModalConfirmacaoRemocao(paciente:Paciente):void{
    this.pacienteRemocao = paciente;
    this.abrirModalConfirmacao(
      "Remover " + paciente.nomeCompleto + "?",
      "A ação não poderá ser revertida!")
  }
  fecharModalRegistrar():void{
    this.aparecerModal = false;
  }


  openModal(paciente:Paciente): void {
    paciente.mostrarModal = true;
  }
  closeModal(paciente:Paciente): void {
    paciente.mostrarModal = false;
  }
  //


  //RELATÓRIO INDIVIDUAL
  modalRelatorio: boolean = false;
  abrirRelatorios():void{
    this.modalRelatorio = true;
  }
  voltarListaPacientes():void{
    this.modalRelatorio = false;
  }
  //

  //REMOVER PACIENTE
  removerPaciente():void{
    this.aparecerModal = false;
    this.listaPacientes.splice(this.listaPacientes.indexOf(this.pacienteRemocao),1);
    localStorage.setItem("ListaPacientes", JSON.stringify(this.listaPacientes));
  }

  //

  abrirNovaConsulta (paciente:Paciente) : void {
    localStorage.setItem("PacienteNovaConsulta", JSON.stringify(paciente));
    this.router.navigate(['/Nova-Consulta'])
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
