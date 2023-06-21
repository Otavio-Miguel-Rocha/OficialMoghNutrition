import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  nomePaciente : string
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

  disableMasculino:boolean=false;
  disableFeminino:boolean=false;

  //Lógica para o checkbox do cadastro
  clickDisable (value:string){
    if(value=="masculino"){
      console.log(this.masculino)
      this.disableMasculino = true;
      this.disableFeminino = false;
      if(this.masculino==true){
        this.masculino=false;
        this.feminino=false;
      }else{
        this.masculino=true;
        this.feminino=false;
      }
      
    }else if(value=="feminino"){
      console.log(this.feminino)
      this.disableMasculino = false;
      this.disableFeminino = true;
      if(this.feminino==true){
        this.masculino=false;
        this.feminino=false;
      }else{
        this.masculino=false;
        this.feminino=true;
      }
  }
  } 


  constructor(private router: Router) { 
    this.userIcon = '/assets/img/userImg.png';
    this.arrowBack = '/assets/img/arrowBack.png';
  }

  ngOnInit() {
    const validaUsuarioLogado: Nutricionista = JSON.parse(localStorage.getItem("nutricionistaLogado"));
    if(validaUsuarioLogado == null){
      this.router.navigate(['/Menu-Inicial']);
    }
    let listaPacientes: Paciente[] = JSON.parse(localStorage.getItem('ListaPacientes'));
    if( listaPacientes != null){
      this.listaPacientes = listaPacientes;
      console.log(this.listaPacientes);
    }
  }

  //MODAL CONFIRMAÇÃO
  aparecerModalConfirmarCadastroPaciente:boolean = false;
  tituloConfirmacao:string;
  dados:string[] = [];

  confirmarCadastro():void{
    this.tituloConfirmacao = "Deseja Cadastrar Paciente?";
    this.dados.push("Paciente: " + this.paciente.nomeCompleto);
    this.dados.push("E-mail: " + this.paciente.email);
    this.dados.push("Telefone: " + this.paciente.telefone);
    this.dados.push("Data de Nascimento: " + this.paciente.dataNascimento);
    this.aparecerModalConfirmarCadastroPaciente = true;
  }
  fecharModalConfirmRegister():void{
    this.dados = [];
    this.aparecerModalConfirmarCadastroPaciente = false;
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
  
  voltarMenuPrincipal() : void {
    this.router.navigate(['/Menu-Principal'])
  }

  cadastrarPaciente() {
    this.aparecerModalConfirmarCadastroPaciente = false;
    this.dados = [];
    if(this.masculino == true) {
      this.paciente.sexo = 'Masculino';
    }else if(this.feminino == true) {
      this.paciente.sexo = 'Feminino';
    }
    console.log(this.paciente.sexo);

    const novoPaciente: Paciente = {
      nomeCompleto: this.paciente.nomeCompleto,
      email : this.paciente.email,
      telefone : this.paciente.telefone,
      sexo : this.paciente.sexo,
      dataNascimento : this.paciente.dataNascimento,
      mostrarModal: false,
      relatorios: [],
    }
    if( this.paciente.nomeCompleto!=''
    && this.paciente.dataNascimento!=''
    ){
      this.listaPacientes.push(novoPaciente);  
      localStorage.setItem('ListaPacientes', JSON.stringify(this.listaPacientes)); 
  
      this.paciente.nomeCompleto = "";
      this.paciente.email = "";
      this.paciente.sexo = "";
      this.paciente.telefone = "";
      this.paciente.dataNascimento = "";
      this.listaPaciente();
     }else{

      // Implementar o MODAL
      console.log('não foi')
     }
  
  
    
  }
  listaPaciente():void{
    this.router.navigate(['/Lista-Pacientes'])
  }
}
