import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  

  @Input()
  tipoModal:boolean;
  
  @Output() 
  confirmar = new EventEmitter();
  
  @Output() 
  fechar = new EventEmitter();
  
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
