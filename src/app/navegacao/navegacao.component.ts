import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Nutricionista{
  CRN: string,
  email: string,
  nomeCompleto: string,
  senha: string,
}

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html',
  styleUrls: ['./navegacao.component.css']
})
export class NavegacaoComponent implements OnInit {


  logoMOGH : string;

  name = '';
  currentRoute : string;

  constructor(private router: Router) {
    this.logoMOGH = '/assets/img/logoMOGH.png'
  }
  

  ngOnInit() {
    //  Função para filtrar apenas da instancia NavigationEnd
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if(event.url == "/"){
          this.currentRoute = "Menu Inicial";
        }
        else{
          // Customizar
          this.currentRoute = event.url;
          this.currentRoute = this.removeForwardSlash(this.currentRoute);
          this.currentRoute = this.removeForwardTrace(this.currentRoute);
        }
        });
  }

  usuarioLogado: Nutricionista = null;

  // Função para remover '/'
  removeForwardSlash(nomePagina: string): string {
    return nomePagina.replace(/\//g, '');
  }
// Função para remover '-'
  removeForwardTrace(nomePagina: string): string {
    return nomePagina.replace(/-/g, ' ');
  }

  // Adiciona a rota para o Menu-Principal quando a logo na nav for clicada
  logoRouting():void {
    console.log(this.router);
    this.router.navigate(['/Menu-Principal'])
  }

}
