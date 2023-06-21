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
    let listaConsultas: Consulta[] = JSON.parse(localStorage.getItem('ListaConsultas'))
    if(listaConsultas != null) {
      this.listaConsultas = listaConsultas;
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
  abrirRelatorios(pacienteRelatorios:Paciente):void{
    this.pacienteRelatorio = pacienteRelatorios;
    this.modalRelatorio = true;
  }
  getConsulta(pacienteRelatorio:Paciente):Consulta[]{
    let consultas: Consulta[] = [];
    this.listaConsultas.filter ( (consulta) => {
      console.log(consulta);
      if(consulta.nomePaciente == pacienteRelatorio.nomeCompleto){
        consultas.push(consulta);
      }
    });
    return consultas;
  }

  voltarListaPacientes():void{
    this.pacienteRelatorio = null;
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

  ngForPacientes() : Paciente[] {
    let listaVazia : Paciente[] = [];
    if(this.modalRelatorio == true) {
      return listaVazia;
    }
    else if(this.modalRelatorio == false) {
      return this.listaPacientes;
    }
  }
}
