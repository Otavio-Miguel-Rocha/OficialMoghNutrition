import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

interface Nutricionista {
  nomeCompleto : string,
  email : string,
  senha : string,
  CRN : string,
  listaPacientes: Paciente[];
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

  listaConsultas: Consulta[] = [];

  constructor(private router: Router) {
    this.upArrowIcon = "/assets/img/arrowClosedModal.png";
    this.downArrowIcon = "/assets/img/arrowOpenModal.png";
    this.arrowBack = '/assets/img/arrowBack.png'
  }
  listaNutricionistas:Nutricionista[];
  ngOnInit() {
    const validaUsuarioLogado: Nutricionista = JSON.parse(localStorage.getItem("nutricionistaLogado"));
    if(validaUsuarioLogado == null){
      this.router.navigate(['/Menu-Inicial']);
    } else{
      this.nutricionistaLogado = validaUsuarioLogado;
    }
    let listaNutricionistas: Nutricionista[] = JSON.parse(localStorage.getItem("NutricionistasLista"));
    if( listaNutricionistas != null ) {
      this.listaNutricionistas = listaNutricionistas;
    }
  }

  nutricionistaLogado: Nutricionista;
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
    this.listaNutricionistas.forEach( (nutricionista) => {
      if( nutricionista.CRN == this.nutricionistaLogado.CRN ){
        nutricionista.listaPacientes.splice(this.nutricionistaLogado.listaPacientes.indexOf(this.pacienteRemocao),1);
        this.nutricionistaLogado.listaPacientes.splice(this.nutricionistaLogado.listaPacientes.indexOf(this.pacienteRemocao),1);
      }
    });
    localStorage.setItem("NutricionistasLista", JSON.stringify(this.listaNutricionistas));
    localStorage.setItem("nutricionistaLogado", JSON.stringify(this.nutricionistaLogado));
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
      return this.nutricionistaLogado.listaPacientes;
    }
  }

  verificaListaPacientes() : boolean {
    if(this.nutricionistaLogado.listaPacientes.length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
