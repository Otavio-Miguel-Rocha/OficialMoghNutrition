
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Nutricionista {
  nomeCompleto : string,
  email : string,
  senha : string,
  CRN : string,
  listaPacientes: Paciente[];
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
  altura: string,
  peso: string,
  porcentagemGordura: string,
  taxaMetabolicaBasal: string,
  triglicerideos: string,
  diabetes: string,
  colesterol: string,
  autofeedback : string,
  objetivoConsulta : string,
  dataConsulta : string,
  nomePaciente : string,
  imc: string,

}

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.css']
})
export class NovaConsultaComponent implements OnInit {
  arrowBack : string;
  modalBoolean : boolean;

  
  constructor(private router: Router) { 
    this.arrowBack = '/assets/img/arrowBack.png'
  }
  nutricionistaLogado: Nutricionista;
  listaNutricionistas: Nutricionista[] = [];
  pacienteNovaConsulta: Paciente;
  ngOnInit() {
    const validaUsuarioLogado: Nutricionista = JSON.parse(localStorage.getItem("nutricionistaLogado"));
    if(validaUsuarioLogado == null){
      this.router.navigate(['/Menu-Inicial']);
    }
    else{
      this.nutricionistaLogado = validaUsuarioLogado;
      this.pacienteNovaConsulta = JSON.parse(localStorage.getItem("PacienteNovaConsulta"));
    }
    let listaNutricionistas: Nutricionista[] = JSON.parse(localStorage.getItem("NutricionistasLista"));
    if( listaNutricionistas != null ) {
      this.listaNutricionistas = listaNutricionistas;
    }
  }

  voltaListaPacientes() : void {
    this.router.navigate(['/Lista-Pacientes'])
  }

  consulta : Consulta = {
    altura : null,
    peso : null,
    porcentagemGordura : null,
    taxaMetabolicaBasal : null,
    triglicerideos : null,
    diabetes : null,
    colesterol : null,
    autofeedback : null,
    objetivoConsulta : null,
    dataConsulta : null,
    nomePaciente : null,
    imc: null
  }

  cancelarCadastro():void{
    this.voltaListaPacientes();
  }


  //MODAL CONFIRMAÇÃO OU AVISO
  modalConfirmacaoNovaConsulta:boolean = false;
  tituloConfirmacao:string;

  //MODAL AVISO
  modalAvisoNovaConsulta:boolean = false;
  tituloErro:string;
  mensagemErro:string;
  abrirModalConfirmacaoNovaConsulta():void{
    console.log(this.consulta);
    if(this.consulta.altura == null || this.consulta.peso == null || this.consulta.dataConsulta == null ||
    this.consulta.porcentagemGordura == null   || this.consulta.peso == null
    ){
      this.tituloErro = "Preencha todos os campos obrigatórios!";
      this.modalAvisoNovaConsulta = true;
    }
    else{
      this.tituloConfirmacao = "Deseja Registrar a Consulta?";
      this.modalConfirmacaoNovaConsulta = true;
    }
  }
  fecharModalConfirmacaoNovaConsulta():void{
    this.modalConfirmacaoNovaConsulta = false;
    this.modalAvisoNovaConsulta = false;

  } 

  novaConsulta() : void {
    this.modalConfirmacaoNovaConsulta = false;
    const novaConsulta : Consulta = {
      altura : this.consulta.altura,
      peso: this.consulta.peso,
      porcentagemGordura: this.consulta.porcentagemGordura,
      taxaMetabolicaBasal: this.consulta.taxaMetabolicaBasal,
      triglicerideos: this.consulta.triglicerideos,
      diabetes: this.consulta.diabetes,
      colesterol: this.consulta.colesterol,
      autofeedback: this.consulta.autofeedback,
      objetivoConsulta: this.consulta.objetivoConsulta,
      dataConsulta: this.consulta.dataConsulta,
      nomePaciente: this.pacienteNovaConsulta.nomeCompleto,
      imc: ((parseFloat(this.consulta.peso)/Math.pow(parseFloat(this.consulta.altura),2))*10000).toFixed(2)
    }
    // 
    this.listaNutricionistas.forEach ( (nutricionista) => {
      if( nutricionista.CRN == this.nutricionistaLogado.CRN ){
        nutricionista.listaPacientes.forEach( (paciente) => {
          if( paciente.nomeCompleto === this.pacienteNovaConsulta.nomeCompleto){
            console.log(nutricionista);
            paciente.relatorios.push(novaConsulta);
            console.log(nutricionista);
            this.nutricionistaLogado = nutricionista;
          }
        });
      }
    });
    localStorage.setItem("NutricionistasLista", JSON.stringify(this.listaNutricionistas));
    localStorage.setItem("nutricionistaLogado", JSON.stringify(this.nutricionistaLogado));
    localStorage.removeItem("PacienteNovaConsulta");
    this.consulta = {
      altura : null,
      peso : null,
      porcentagemGordura : null,
      taxaMetabolicaBasal : null,
      triglicerideos : null,
      diabetes : null,
      colesterol : null,
      autofeedback : null,
      objetivoConsulta : null,
      dataConsulta : null,
      nomePaciente : null,
      imc: null
    }
    this.router.navigate(['/Lista-Pacientes'])
  }

}
