import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { forEach } from "@angular/router/src/utils/collection";

interface Nutricionista {
  nomeCompleto : string,
  email : string,
  senha : string,
  CRN : string;
}


@Component({
  selector: "app-menu-inicial",
  templateUrl: "./menu-inicial.component.html",
  styleUrls: ["./menu-inicial.component.css"],
})
export class MenuInicialComponent implements OnInit {

  constructor(private router: Router) {}

  nutricionistasLista : Nutricionista[] = [];

  nomeCompleto: string;
  email: string;
  senha: string;
  CRN: string;

  ngOnInit() {
    let listaNutricionistas = JSON.parse(localStorage.getItem("NutricionistasLista"));
    if( listaNutricionistas != null ){
      this.nutricionistasLista = listaNutricionistas;
    }
  }

  //LOGIN E REGISTER
  loginERegisterView: boolean = false;

  trocaTelaLogin(): void {
    this.loginERegisterView = false;
  }
  trocaTelaRegistro(): void {
    this.loginERegisterView = true;
  }

  //MODAL CONFIRMAÇÃO OU AVISO
    aparecerModal:boolean = false;
    tipoModal:boolean;
    tituloModal:string;
    conteudoModal:string;
    abrirModalRegistrar():void{
      if(this.nutricionista.CRN == "" || this.nutricionista.nomeCompleto == "" || this.nutricionista.email == "" || this.nutricionista.senha == ""  ) {
        this.abrirModalAviso("Atenção no Cadastro!", "Todos os campos devem ser preenchidos!");
      } else{
        if(this.verificarFormatoCRN(this.nutricionista.CRN)){
          this.abrirModalConfirmacao("Confirme seus Dados", "Nome: " + this.nutricionista.nomeCompleto  + ' E-mail: ' + this.nutricionista.email + ' CRN: ' + this.nutricionista.CRN ); 
        } else{
          this.abrirModalAviso("Formato de CRN Inválido", "Formato correto: XX-XXXX");
        }
      }
      this.aparecerModal = true;
    }
    fecharModalRegistrar():void{
      this.aparecerModal = false;
    }
  //

  nutricionista : Nutricionista  = {
    nomeCompleto: "",
    email: "",
    senha: "",
    CRN:""
  }


  //CONFIRMAR
  botaoConfirmarModal():void{
    this.aparecerModal = false;
    let verificarCRNExistente:boolean = false;
    if( this.nutricionistasLista.length > 0 ){
      if( this.nutricionistasLista.find( (nutricionista) => nutricionista.CRN == this.nutricionista.CRN) != null){
        verificarCRNExistente = true;
      }
    }
    if(!verificarCRNExistente){
      this.nutricionistasLista.push(this.nutricionista);
      localStorage.setItem('NutricionistasLista', JSON.stringify(this.nutricionistasLista));
      this.nutricionista.nomeCompleto = "";
      this.nutricionista.email = "";
      this.nutricionista.senha = "";
      this.nutricionista.CRN = "";
    } else{
      this.abrirModalAviso("ATENÇÃO", "Já existe outro nutricionista cadastrado com o CRN " + this.nutricionista.CRN);
    }
  }
  // LOGIN
  loginCRN:string;
  loginSenha:string;
  verificacaoLogin():void {
    let verificarCRNValido: boolean = false;
    this.nutricionistasLista.forEach( (nutricionistaFor) => {
        if(nutricionistaFor.CRN === this.loginCRN) {
          verificarCRNValido = true;
          if(nutricionistaFor.senha === this.loginSenha) {
            this.router.navigate(['/Menu-Principal'])
          }else{
            this.abrirModalAviso("Senha Incorreta", "Por favor insira novamente");
          }
        }
    });
    if(!verificarCRNValido){
      this.abrirModalAviso("CRN Inválido","Verifique o seu CRN")
    }
    this.loginCRN = "";
    this.loginSenha = "";
  }


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


  verificarFormatoCRN(crn: string): boolean {
    const formatoCRN = /^\d{2}-\d{4}$/;
    return formatoCRN.test(crn);
  }
}
