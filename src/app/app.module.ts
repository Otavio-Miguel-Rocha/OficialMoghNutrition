import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { NovaConsultaComponent } from './nova-consulta/nova-consulta.component';
import { NavegacaoComponent } from './navegacao/navegacao.component';
import { AppRountingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuInicialComponent,
    MenuPrincipalComponent,
    ListaPacientesComponent,
    CadastroPacienteComponent,
    NovaConsultaComponent,
    NavegacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRountingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
