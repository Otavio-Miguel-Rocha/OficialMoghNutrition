import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

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
    this.nutricionista.email="";
    this.nutricionista.nomeCompleto="";
    this.nutricionista.senha="";
    this.nutricionista.CRN="";
  }
  trocaTelaRegistro(): void {
    this.loginERegisterView = true;
    this.loginCRN="";
    this.loginSenha="";
  }

    //MODAL CONFIRMAÇÃO
    aparecerModalConfirmarRegister:boolean = false;
    tituloConfirmacao:string;
    dados:string[] = [];

    //MODAL AVISO
    aparecerModalAvisoRegister:boolean = false;
    tituloErro:string;
    erro:string;
    abrirModalRegistrar():void{
      if(this.nutricionista.CRN == "" || this.nutricionista.nomeCompleto == "" || this.nutricionista.email == "" || this.nutricionista.senha == ""  ) {
        this.tituloErro = "Atenção no Cadastro!";
        this.erro = "Todos os campos devem ser preenchidos!";
        this.aparecerModalAvisoRegister = true;
      } else{
        if(this.verificarFormatoCRN(this.nutricionista.CRN)){
          this.tituloConfirmacao = "Confirme seus Dados";
          this.dados.push("Nome: " + this.nutricionista.nomeCompleto);
          this.dados.push("E-mail: " + this.nutricionista.email);
          this.dados.push("CRN: " + this.nutricionista.CRN);
          this.aparecerModalConfirmarRegister = true;
        } else{
          this.verificarFormatoCRNModal();
        }
      }
    }


    fecharModalConfirmRegister():void{
      this.aparecerModalConfirmarRegister = false;
      this.dados = [];
    }
    fecharModalAvisoRegister():void{
      this.aparecerModalAvisoRegister = false;
    }
  //

  nutricionista : Nutricionista  = {
    nomeCompleto: "",
    email: "",
    senha: "",
    CRN:""
  }


  //CONFIRMAR
  confirmarRegister():void{
    this.aparecerModalAvisoRegister = false;
    let verificarCRNExistente:boolean = false;
    if( this.nutricionistasLista.length > 0 ){
      if( this.nutricionistasLista.find( (nutricionista) => nutricionista.CRN == this.nutricionista.CRN) != null){
        verificarCRNExistente = true;
      }
    }
    if(!verificarCRNExistente){
      const novoNutricionista: Nutricionista = {
        nomeCompleto: this.nutricionista.nomeCompleto,
        email: this.nutricionista.email,
        senha: this.nutricionista.senha,
        CRN: this.nutricionista.CRN,
      }
      this.nutricionistasLista.push(novoNutricionista);
      localStorage.setItem('NutricionistasLista', JSON.stringify(this.nutricionistasLista));
      this.nutricionista.nomeCompleto = "";
      this.nutricionista.email = "";
      this.nutricionista.senha = "";
      this.nutricionista.CRN = "";
    } else{
      this.tituloErro = "ATENÇÃO";
      this.erro = "Já existe outro nutricionista cadastrado com o CRN " + this.nutricionista.CRN;
      this.aparecerModalAvisoRegister = true;
    }
  }
  // LOGIN
  loginCRN:string;
  loginSenha:string;
  verificacaoLogin():void {
    if(!this.verificarFormatoCRN(this.loginCRN)){
      this.verificarFormatoCRNModal();
    }
    else{
      let verificarCRNExistente: boolean = false;
      this.nutricionistasLista.forEach( (nutricionistaFor) => {
        if(nutricionistaFor.CRN == this.loginCRN) {
          verificarCRNExistente = true;
          if(nutricionistaFor.senha == this.loginSenha) {
            localStorage.setItem("nutricionistaLogado", JSON.stringify(nutricionistaFor));
            this.router.navigate(['/Menu-Principal'])
          }else{
            this.tituloErro = "Senha Incorreta";
            this.erro = "Por favor insira novamente";
            this.aparecerModalAvisoRegister = true;
          }
        }
    });
    if(!verificarCRNExistente){
      this.tituloErro = "CRN Inválido";
      this.erro = "O CRN pode não existir ou estar incorreto.";
      this.aparecerModalAvisoRegister = true;
    }
    this.loginCRN = "";
    this.loginSenha = "";
  }
  }

  verificarFormatoCRNModal():void{
    this.tituloErro = "Formato de CRN Inválido";
    this.erro = "Formato correto: XX-XXXX";
    this.aparecerModalAvisoRegister = true;
  }




  verificarFormatoCRN(crn: string): boolean {
    const formatoCRN = /^\d{2}-\d{4}$/;
    return formatoCRN.test(crn);
  }

  formatarCRNLogin():void{
    this.loginCRN = this.formatarCRN(this.loginCRN);
  }
  formatarCRNRegistro():void{
    this.nutricionista.CRN = this.formatarCRN(this.nutricionista.CRN);
  }

  formatarCRN(crn:string):string {
    const apenasDigitos = crn.replace(/\D/g, '');
    return apenasDigitos.replace(/(\d{2})(\d{0,4})/, '$1-$2'); 
  }
}
