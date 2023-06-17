import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Paciente {
  nomeCompleto: string,
  email: string,
  telefone: string,
  sexo: string,
  dataNascimento: string
}

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {

  userIcon: string;
  arrowBack: string;

  constructor(private router: Router) { 
    this.userIcon = '/assets/img/userImg.png';
    this.arrowBack = '/assets/img/arrowBack.png';
  }

  ngOnInit() {
  }

  paciente : Paciente = {
    nomeCompleto : "",
    email : "",
    telefone : "",
    sexo : "",
    dataNascimento : ""
  }
  
  voltarMenuPrincipal() : void {
    this.router.navigate(['/Menu-Principal'])
  }

}
