import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  ngOnInit() {
    this.modalBoolean = true;
    }

  voltaListaPacientes() : void {
    console.log("1")
    this.router.navigate(['/Lista-Pacientes'])
  }

  

}
