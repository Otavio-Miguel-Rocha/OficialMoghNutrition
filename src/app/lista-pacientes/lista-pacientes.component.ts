import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Nutricionista } from 'src/app/interfaces/nutricionista';
import { Consulta } from 'src/app/interfaces/consulta';
import { Paciente } from 'src/app/interfaces/paciente'

@Component({
  selector: "app-lista-pacientes",
  templateUrl: "./lista-pacientes.component.html",
  styleUrls: ["./lista-pacientes.component.css"],
})
export class ListaPacientesComponent implements OnInit {

  //Imagens
  upArrowIcon: string;
  downArrowIcon: string;
  arrowBack:string;

  modalBoolean : boolean;

  listaConsultas: Consulta[] = [];

  //Atribuindo as imagens a variaveis
  constructor(private router: Router) {
    this.upArrowIcon = "/assets/img/arrowClosedModal.png";
    this.downArrowIcon = "/assets/img/arrowOpenModal.png";
    this.arrowBack = '/assets/img/arrowBack.png'
  }
  listaNutricionistas:Nutricionista[];
  //Verificação de usuário
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
  //Objeto de nutricionista logado para futuras verificações ao mesmo
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


  // Lógica modais
  openModal(paciente:Paciente): void {
    paciente.mostrarModal = true;
  }
  closeModal(paciente:Paciente): void {
    paciente.mostrarModal = false;
  }


  //Relatório individual
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


  //Modal Confirmação
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

  //Remover paciente
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

  //Lógica de rotas
  abrirNovaConsulta (paciente:Paciente) : void {
    localStorage.setItem("PacienteNovaConsulta", JSON.stringify(paciente));
    this.router.navigate(['/Nova-Consulta'])
  }

  aparecerModalInformacao: boolean = false;
  tipoDadoInformacao:string;
  textoModalInformacao:string;
  //Modais de informação e confirmação
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

  //Lógica ngFor com ngIf
  ngForPacientes() : Paciente[] {
    let listaVazia : Paciente[] = [];
    if(this.modalRelatorio == true) {
      return listaVazia;
    }
    else if(this.modalRelatorio == false) {
      return this.nutricionistaLogado.listaPacientes;
    }
  }

  //Lógica de verificação da lista de pacientes
  verificaListaPacientes() : boolean {
    if(this.nutricionistaLogado.listaPacientes.length == 0) {
      return false;
    } else {
      return true;
    }
  }
}
