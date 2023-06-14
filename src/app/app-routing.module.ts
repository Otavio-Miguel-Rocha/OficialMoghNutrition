import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CadastroPacienteComponent } from "./cadastro-paciente/cadastro-paciente.component";
import { ListaPacientesComponent } from "./lista-pacientes/lista-pacientes.component";
import { MenuInicialComponent } from "./menu-inicial/menu-inicial.component";
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
import { NovaConsultaComponent } from "./nova-consulta/nova-consulta.component";

const routes: Route[] = [
  {
    path: "Menu-Inicial",
    component: MenuInicialComponent,
  },
  {
    path: "Menu-Principal",
    component: MenuPrincipalComponent,
  },
  {
    path: "Lista-Pacientes",
    component: ListaPacientesComponent,
  },
  {
    path: "Cadastro-Paciente",
    component: CadastroPacienteComponent,
  },
  {
    path: "Nova-Consulta",
    component: NovaConsultaComponent,
  },
  
  {
    path: "",
    pathMatch: "full",
    redirectTo: "Menu-Inicial",
  }, //default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRountingModule {}