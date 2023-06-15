import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {

  userIcon: string;
  arrowBack: string;

  constructor() { 
    this.userIcon = '/assets/img/userImg.png';
    this.arrowBack = '/assets/img/arrowBack.png';
  }

  ngOnInit() {
  }

}
