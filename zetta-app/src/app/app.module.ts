import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlockUIModule } from 'ng-block-ui';

import { SharedModule } from './shared/shared.module';
import { CargoListComponent } from './component/cargo-list/cargo-list.component';
import { PerfilListComponent } from './component/perfil-list/perfil-list.component';
import { UsuarioListComponent } from './component/usuario-list/usuario-list.component';
import { PipesModule } from './pipes/pipes.module';
@NgModule({
  declarations: [
    AppComponent,
    CargoListComponent,
    PerfilListComponent,
    UsuarioListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    PipesModule,
    BlockUIModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
