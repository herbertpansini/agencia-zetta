import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargoListComponent } from './component/cargo-list/cargo-list.component';
import { PerfilListComponent } from './component/perfil-list/perfil-list.component';
import { UsuarioListComponent } from './component/usuario-list/usuario-list.component';

const routes: Routes = [
  { path: 'cargos', component: CargoListComponent },
  { path: 'perfis', component: PerfilListComponent },
  { path: 'usuarios', component: UsuarioListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
