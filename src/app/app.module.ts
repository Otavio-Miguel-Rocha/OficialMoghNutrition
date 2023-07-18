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
import { NutricionistaService } from 'src/services/user.service';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { CriptografiaService } from '../services/criptografia.service';
import { LocalStorageService } from '../services/LocalStorage.service';

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
  providers: [
    AuthGuardService,
    NutricionistaService,
    CriptografiaService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
