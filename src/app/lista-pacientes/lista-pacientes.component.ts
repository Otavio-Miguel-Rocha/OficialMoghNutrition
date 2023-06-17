import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-lista-pacientes",
  templateUrl: "./lista-pacientes.component.html",
  styleUrls: ["./lista-pacientes.component.css"],
})
export class ListaPacientesComponent implements OnInit {
  upArrowIcon: string;
  downArrowIcon: string;
  constructor() {
    this.upArrowIcon = "/assets/imgs/icons/up-arrow-icon.png";
    this.downArrowIcon = "/assets/imgs/icons/down-arrow-icon.png";
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
  modalRelatorio: boolean = true;
  abrirRelatorios():void{
    this.modalRelatorio = true;

  }
  //
}
