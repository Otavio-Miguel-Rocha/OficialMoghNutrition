import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
// Recebe um valor boolean
  @Input()
  tipoModal:boolean;
  // Exporta um evento de confirmar
  @Output() 
  confirmar = new EventEmitter();
  //  Exporta um evento de fechar
  @Output() 
  fechar = new EventEmitter();
  

  // Funções de confirmar e fechar
  botaoConfirmar(): void {
    this.confirmar.emit();
  }
  
  botaoFechar():void{
    this.fechar.emit();
  }
  
  logoMOGH : string;

  constructor() {
    this.logoMOGH = './assets/img/logoMOGH.png';
  }

  ngOnInit() {
  }


}
