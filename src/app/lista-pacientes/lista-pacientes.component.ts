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
  relatorios: Consulta[],
}

interface Consulta {
  altura: number,
  peso: number,
  porcentagemGordura: number,
  taxaMetabolicaBasal: number,
  triglicerideos: number,
  diabetes: string,
  colesterol: string,
  autofeedback : string,
  objetivoConsulta : string,
  dataConsulta : string,
  nomePaciente : string,
  imc: string,

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

  modalBoolean : boolean;

  listaPacientes: Paciente[] = [];
  listaConsultas: Consulta[] = [];

  constructor(private router: Router) {
    this.upArrowIcon = "/assets/img/arrowClosedModal.png";
    this.downArrowIcon = "/assets/img/arrowOpenModal.png";
    this.arrowBack = '/assets/img/arrowBack.png'
  }

  ngOnInit() {
    const validaUsuarioLogado: Nutricionista = JSON.parse(localStorage.getItem("nutricionistaLogado"));
    if(validaUsuarioLogado == null){
      this.router.navigate(['/Menu-Inicial']);
    }
    let listaPacientes: Paciente[] = JSON.parse(localStorage.getItem('ListaPacientes'));
    if( listaPacientes != null){
      this.listaPacientes = listaPacientes;
    }
  }

  paciente : Paciente = {
    nomeCompleto : "",
    email : "",
    telefone : "",
    sexo : "",
    dataNascimento : "",
    mostrarModal: false,
    relatorios: [],
  }


  openModal(paciente:Paciente): void {
    paciente.mostrarModal = true;
  }
  closeModal(paciente:Paciente): void {
    paciente.mostrarModal = false;
  }
  //


  //RELATÓRIO INDIVIDUAL
  pacienteRelatorio: Paciente;
  modalRelatorio: boolean = false;
  modalAvisoListaVaziaRelatorio:boolean = false;
  abrirRelatorios(pacienteRelatorios:Paciente):void{
    this.pacienteRelatorio = pacienteRelatorios;
    if( this.pacienteRelatorio.relatorios.length == 0 ){
      this.modalAvisoListaVaziaRelatorio = true;
    } else{
      this.modalAvisoListaVaziaRelatorio = false;
    }
    this.modalRelatorio = true;
  }
  voltarListaPacientes():void{    
    this.modalRelatorio = false;
  }
  //


  //MODAL CONFIRMAÇÃO
  aparecerModalConfirmarRemocao:boolean = false;
  tituloConfirmacao:string;
  mensagemConfirmacao:string;
  pacienteRemocao:Paciente;
  abrirModalConfirmacaoRemocao(paciente:Paciente):void{
    this.pacienteRemocao = paciente;
    this.tituloConfirmacao = "Remover " + this.pacienteRemocao.nomeCompleto + "?";
    this.mensagemConfirmacao = "A ação não poderá ser revertida!";
    this.aparecerModalConfirmarRemocao = true;
  }
  fecharModalRemocao():void{
    this.aparecerModalConfirmarRemocao = false;
  }
  //REMOVER PACIENTE
  removerPaciente():void{
    this.aparecerModalConfirmarRemocao = false;
    this.listaPacientes.splice(this.listaPacientes.indexOf(this.pacienteRemocao),1);
    localStorage.setItem("ListaPacientes", JSON.stringify(this.listaPacientes));
  }

  //

  abrirNovaConsulta (paciente:Paciente) : void {
    localStorage.setItem("PacienteNovaConsulta", JSON.stringify(paciente));
    this.router.navigate(['/Nova-Consulta'])
  }

  aparecerModalInformacao: boolean = false;
  tipoDadoInformacao:string;
  textoModalInformacao:string;
  abrirModalInformacaoAutoFeedback(informacao:string):void{
    this.tipoDadoInformacao = "Auto Feedback";
    this.textoModalInformacao = informacao;
    this.aparecerModalInformacao = true;
  }
  abrirModalInformacaoOjetivo(informacao:string):void{
    this.tipoDadoInformacao = "Objetivo do Paciente";
    this.textoModalInformacao = informacao;
    this.aparecerModalInformacao = true;
  }
  fecharModalInformacao(): void{
    this.aparecerModalInformacao = false;
  }

  ngForPacientes() : Paciente[] {
    let listaVazia : Paciente[] = [];
    if(this.modalRelatorio == true) {
      return listaVazia;
    }
    else if(this.modalRelatorio == false) {
      return this.listaPacientes;
    }
  }

  verificaListaPacientes() : boolean {
    if(this.listaPacientes.length == 0) {
      console.log("false")
      return false;
    } else {
      return true;
    }
  }
}
