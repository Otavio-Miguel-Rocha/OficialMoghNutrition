import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { Nutricionista } from 'src/app/interfaces/nutricionista';
import { Consulta } from 'src/app/interfaces/consulta';
import { Paciente } from 'src/app/interfaces/paciente'
import { NutricionistaService } from "src/services/user.service";

@Component({
  selector: "app-menu-inicial",
  templateUrl: "./menu-inicial.component.html",
  styleUrls: ["./menu-inicial.component.css"],
})
export class MenuInicialComponent implements OnInit {

  constructor(
    private router: Router,
    private nutricionistaService: NutricionistaService
    ) {}

  nutricionistasLista : Nutricionista[] = [];

  nomeCompleto: string;
  email: string;
  senha: string;
  CRN: string;

  //Verificação da lista no localStorage
  ngOnInit() {
    if(this.nutricionistaService.getLoggedUser()){
      this.router.navigate(['/Menu-Principal']);
    }
    let listaNutricionistas = JSON.parse(localStorage.getItem("NutricionistasLista"));
    if( listaNutricionistas != null ){
      this.nutricionistasLista = listaNutricionistas;
    }
  }

  //Login e registro
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

    //Modal confirmação
    aparecerModalConfirmarRegister:boolean = false;
    tituloConfirmacao:string;
    dados:string[] = [];

    //Modal aviso
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
    CRN:"",
    listaPacientes : []
  }


  //Confirmar Cadastro
  confirmarRegister():void{
    this.aparecerModalConfirmarRegister = false;
    this.dados = [];
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
        listaPacientes: []
      }
      this.nutricionistasLista.push(novoNutricionista);
      localStorage.setItem('NutricionistasLista', JSON.stringify(this.embaralhamentoLista(JSON.stringify(this.nutricionistasLista))));
      this.nutricionista.nomeCompleto = "";
      this.nutricionista.email = "";
      this.nutricionista.senha = "";
      this.nutricionista.CRN = "";
    } else{
      this.tituloErro = "ATENÇÃO";
      this.erro = "Já existe outro nutricionista cadastrado com o CRN " + this.nutricionista.CRN;
      this.aparecerModalAvisoRegister = true;
    }
    this.loginERegisterView = false;
  }

  embaralhamentoLista(nutricionistasListaString: string): String {
    const arrayCaracteres = nutricionistasListaString.split('');

  // Embaralha a array de caracteres usando o algoritmo de Fisher-Yates
  for (let i = arrayCaracteres.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrayCaracteres[i], arrayCaracteres[j]] = [arrayCaracteres[j], arrayCaracteres[i]];
  }

  // Junta os caracteres embaralhados de volta em uma string
  const stringEmbaralhada = arrayCaracteres.join('');
    
  return stringEmbaralhada;
  }


  // Verificação e redireção do login
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
            this.nutricionistaService.setNutricionistaLogado(nutricionistaFor);
            this.router.navigate(['/Menu-Principal'])
          }else{
            this.tituloErro = "CRN ou Senha Incorretos";
            this.erro = "Por favor insira novamente";
            this.aparecerModalAvisoRegister = true;
          }
        }
    });
    if(!verificarCRNExistente){
      this.tituloErro = "CRN ou Senha Incorretos";
      this.erro = "Por favor insira novamente";
      this.aparecerModalAvisoRegister = true;
    }
    this.loginCRN = "";
    this.loginSenha = "";
  }
  }

  //Verificação de formato da CRN
  verificarFormatoCRNModal():void{
    this.tituloErro = "Formato de CRN Inválido";
    this.erro = "Formato correto: XX-XXXX";
    this.aparecerModalAvisoRegister = true;
  }
  verificarFormatoCRN(crn: string): boolean {
    const formatoCRN = /^\d{2}-\d{4}$/;
    return formatoCRN.test(crn);
  }

  //Formatador de CRN no Login e no Registro
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
