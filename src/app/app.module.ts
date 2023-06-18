import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuInicialComponent } from './menu-inicial/menu-inicial.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { NovaConsultaComponent } from './nova-consulta/nova-consulta.component';
import { NavegacaoComponent } from './navegacao/navegacao.component';
import { AppRountingModule } from './app-routing.module';
import { ListaPacientesComponent } from './lista-pacientes/lista-pacientes.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MenuInicialComponent,
    MenuPrincipalComponent,
    ListaPacientesComponent,
    CadastroPacienteComponent,
    NovaConsultaComponent,
    NavegacaoComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRountingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
