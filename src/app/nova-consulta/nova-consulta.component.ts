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
  dataConsulta : string
}

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.css']
})
export class NovaConsultaComponent implements OnInit {
  arrowBack : string;
  modalBoolean : boolean;
  listaConsultas : Consulta[] = [];

  
  constructor(private router: Router) { 
    this.arrowBack = '/assets/img/arrowBack.png'
  }

  pacienteNovaConsulta: Paciente;

  ngOnInit() {
    const validaUsuarioLogado: Nutricionista = JSON.parse(localStorage.getItem("nutricionistaLogado"));
    if(validaUsuarioLogado == null){
      this.abrirModalAviso("ACESSO NEGADO", "Você deve estar logado para acessar essa página!");
      this.router.navigate(['/Menu-Inicial']);
    }
    else{
      this.pacienteNovaConsulta = JSON.parse(localStorage.getItem("PacienteNovaConsulta"));
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
    dataConsulta : null
  }


  //MODAL CONFIRMAÇÃO OU AVISO
  aparecerModal:boolean = false;
  tipoModal:boolean;
  tituloModal:string;
  conteudoModal:string;
  abrirModalConfirmacao(titulo:string, conteudo:string):void{
    this.aparecerModal = true;
    this.tituloModal = titulo;
    this.conteudoModal = conteudo;
    this.tipoModal = false;
  }
  abrirModalAviso(titulo:string, conteudo:string):void{
    this.aparecerModal = true;
    this.tituloModal = titulo;
    this.conteudoModal = conteudo;
    this.tipoModal = true;
  }

  novaConsulta() : void {
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
      dataConsulta: this.consulta.dataConsulta
    }
    this.listaConsultas.push(novaConsulta);
    localStorage.setItem('ListaConsultas', JSON.stringify(this.listaConsultas))

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
    dataConsulta : null
    }
  }

}
