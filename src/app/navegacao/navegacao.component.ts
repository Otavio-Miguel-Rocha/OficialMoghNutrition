import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.currentRoute = this.removeForwardSlash(this.currentRoute);
        this.currentRoute = this.removeForwardTrace(this.currentRoute);
      });
  }
  

  ngOnInit() {
  }

  removeForwardSlash(nomePagina: string): string {
    return nomePagina.replace(/\//g, '');
  }

  removeForwardTrace(nomePagina: string): string {
    return nomePagina.replace(/-/g, ' ');
  }

}
