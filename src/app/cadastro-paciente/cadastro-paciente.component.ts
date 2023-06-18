import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Paciente {
  nomeCompleto: string,
  email: string,
  telefone: string,
  sexo: string,
  dataNascimento: string,
}

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.component.html',
  styleUrls: ['./cadastro-paciente.component.css']
})
export class CadastroPacienteComponent implements OnInit {

  userIcon: string;
  arrowBack: string;

  listaPacientes: Paciente[] = [];

  masculino: boolean = false;
  feminino: boolean = false;

  constructor(private router: Router) { 
    this.userIcon = '/assets/img/userImg.png';
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
    dataNascimento : ""
  }
  
  voltarMenuPrincipal() : void {
    this.router.navigate(['/Menu-Principal'])
  }

  cadastrarPaciente() {

    if(this.masculino == true) {
      this.paciente.sexo = 'masculino';
    }
    else if(this.feminino == true) {
      this.paciente.sexo == 'feminino';
    }
    const novoPaciente: Paciente = {
      nomeCompleto: this.paciente.nomeCompleto,
      email : this.paciente.email,
      telefone : this.paciente.telefone,
      sexo : this.paciente.sexo,
      dataNascimento : this.paciente.dataNascimento,
    }
    this.listaPacientes.push(novoPaciente);  
    localStorage.setItem('ListaPacientes', JSON.stringify(this.listaPacientes)); 

    this.paciente.nomeCompleto = "";
    this.paciente.email = "";
    this.paciente.sexo = "";
    this.paciente.telefone = "";
    this.paciente.dataNascimento = "";
  
  }
}
