import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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

  //MODAL CONFIRMAÇÃO
    modalConfirmacao:boolean = false;
    abrirModalConfirmacao():void{
      this.modalConfirmacao = true;
    }
  //

  //DESCRIÇÃO DO PACIENTE
  modalDescricaoPaciente: boolean = true;
  pacienteModalSexo:string;
  pacienteModalTelefone:string;
  pacienteModalDataNascimento:string;
  openModal(): void {
    this.modalDescricaoPaciente = true;
  }
  closeModal(): void {
    this.modalDescricaoPaciente = false;
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

  abrirNovaConsulta () : void {
    this.router.navigate(['/Nova-Consulta'])
  }
}
