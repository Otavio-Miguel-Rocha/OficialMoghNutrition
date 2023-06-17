import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-lista-pacientes",
  templateUrl: "./lista-pacientes.component.html",
  styleUrls: ["./lista-pacientes.component.css"],
})
export class ListaPacientesComponent implements OnInit {

  upArrowIcon: string;
  downArrowIcon: string;
  arrowBack:string;
  constructor() {
    this.upArrowIcon = "/assets/img/arrowClosedModal.png";
    this.downArrowIcon = "/assets/img/arrowOpenModal.png";
    this.arrowBack = '/assets/img/arrowBack.png';
  }

  ngOnInit() {}


  //DESCRIÇÃO DO PACIENTE
  modalDescricaoPaciente: boolean = true;

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
}
